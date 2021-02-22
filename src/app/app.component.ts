import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sun';
  editField = '';
  lines = []; // header
  linesR = []; // body
  isChecked: boolean;
  features: number;
  dataPoints: number;
  featureArray: [];
  featureSelect = []; // 10 for the time being, selected features
  target = -1; // selected target index
  outputFeatureName = [];
  outputFeatureMatrix = [];
  changeListener(files: FileList): void{
    console.log(files);
    if (files && files.length > 0) {
      const file: File = files.item(0);
      console.log(file.name);
      console.log(file.size);
      console.log(file.type);

      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const csv: any = reader.result;
        let allTextLines = [];
        allTextLines = csv.split(/\n/);
        const headers = allTextLines[0].split(',');
        for (const entry of headers){
          this.featureSelect.push(false);
        }
        const data = headers;
        this.featureArray = headers;
        const tarr = [];
        for (let j = 0; j < headers.length; j++) {
          tarr.push(data[j]);
        }
        this.lines.push(tarr);
        const tarrR = [];
        const arrl = allTextLines.length;
        const rows = [];
        for (let i = 1; i < arrl; i++) {
          rows.push(allTextLines[i].split(','));
        }
        for (let j = 0; j < arrl - 1; j++) {
          tarrR.push(rows[j]);
        }
        this.linesR.push(tarrR);
        this.features = headers.length;
        this.dataPoints = allTextLines.length - 1;
      };
    }
  }
  changeValue(row: number, column: number, event: any): void{
    this.editField = event.target.textContent;
  }
  updateList(row: number, column: number, event: any): void {
    const editField = event.target.textContent;
    this.linesR[0][row][column] = editField;
  }
  remove(row: number): void {
    this.linesR[0].splice(row, 1);
    this.dataPoints--;
  }
  add(): void {
    this.dataPoints++;
    const tempRow = [];
    for (let i = 0; i < this.features; i++){
      tempRow.push(this.linesR[0][0][i]);
    }
    this.linesR[0].unshift(tempRow);
  }
  generate(): void{ // generate outputFeatureMatrix and outputFeatureName, target is represented as an index
    const featureIndex = [];
    for (let i = 0; i < this.featureSelect.length; i++){
      if (this.featureSelect[i]){
        this.outputFeatureMatrix.push([]);
        featureIndex.push(i);
        this.outputFeatureName.push(this.featureArray[i]);
      }
    }
    for (let j = 0; j < featureIndex.length; j++){
      for (let i = 0; i < this.dataPoints; i++){
        this.outputFeatureMatrix[j].push(this.linesR[0][i][featureIndex[j]]);
      }
    }
    console.log(this.outputFeatureMatrix); // see the matrix in debug console
  }
}
