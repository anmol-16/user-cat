import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload-service';

@Component({
  selector: 'app-bulk-import',
  templateUrl: './bulk-import.component.html',
  styleUrls: ['./bulk-import.component.css']
})
export class BulkImportComponent {
    shortLink: string = "";
    loading: boolean = false; 
    file: File | any = null;
  
    constructor(private fileUploadService: FileUploadService) { }
  
    ngOnInit(): void {
    }
  
    onChange(event:any) {
        this.file = event.target.files[0];
    }
  
    onUpload() {
        this.loading = !this.loading;
        console.log(this.file);
        this.fileUploadService.upload(this.file).subscribe(
            (event: any) => {
                if (typeof (event) === 'object') {
                    this.shortLink = event.link;
  
                    this.loading = false; 
                }
            }
        );
    }
}
