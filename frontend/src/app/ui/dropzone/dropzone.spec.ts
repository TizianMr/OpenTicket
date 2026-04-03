import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dropzone } from './dropzone';

describe('Dropzone', () => {
  let component: Dropzone;
  let fixture: ComponentFixture<Dropzone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dropzone],
    }).compileComponents();

    fixture = TestBed.createComponent(Dropzone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isDragging()).toBeFalsy();
    expect(component.droppedFiles()).toHaveLength(0);
  });

  it('should update isDragging onDrag', () => {
    const event = {
      preventDefault: vi.fn(),
    } as unknown as DragEvent;

    component.onDragOver(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.isDragging()).toBe(true);

    component.onDragLeave(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.isDragging()).toBe(false);
  });

  it('should remove file', () => {
    const fileA = new File(['content-A'], 'a.txt', { type: 'text/plain' });
    const fileB = new File(['content-B'], 'b.txt', { type: 'text/plain' });

    const event = {
      stopPropagation: vi.fn(),
    } as unknown as MouseEvent;

    component.droppedFiles.set([fileA, fileB]);

    expect(component.droppedFiles()).toHaveLength(2);

    component.onFileRemove(event, fileA.name);

    expect(component.droppedFiles()).toHaveLength(1);
    expect(component.droppedFiles()).not.toContain(fileA);
  });

  it('should add file onSelect', () => {
    const fileA = new File(['content-A'], 'a.txt', { type: 'text/plain' });

    const event = {
      target: {
        files: [fileA],
      },
    } as unknown as MouseEvent;

    expect(component.droppedFiles()).toHaveLength(0);

    component.onFileSelect(event);

    expect(component.droppedFiles()).toHaveLength(1);
    expect(component.droppedFiles()).toContain(fileA);
  });

  it('should add file onDrop', () => {
    const fileA = new File(['content-A'], 'a.txt', { type: 'text/plain' });

    const event = {
      preventDefault: vi.fn(),
      dataTransfer: {
        files: [fileA],
      },
    } as unknown as DragEvent;

    expect(component.droppedFiles()).toHaveLength(0);

    component.onDrop(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.droppedFiles()).toHaveLength(1);
    expect(component.droppedFiles()).toContain(fileA);
  });
});
