import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  imports: [],
  templateUrl: './dropzone.html',
  styleUrl: './dropzone.css',
})
export class Dropzone {
  isDragging = signal(false);
  droppedFiles = signal<File[]>([]);
  filesChanged = output<File[]>();

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);

    const files = event.dataTransfer?.files;
    if (!files || files.length === 0) {
      return;
    }

    this.droppedFiles.set(Array.from(files));
    this.filesChanged.emit(this.droppedFiles());
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.droppedFiles.set(Array.from(input.files));
      this.filesChanged.emit(this.droppedFiles());
    }
  }

  onFileRemove(event: MouseEvent, fileName: String): void {
    event.stopPropagation();
    this.droppedFiles.update((files) => files.filter((f) => f.name !== fileName));
    this.filesChanged.emit(this.droppedFiles());
  }
}
