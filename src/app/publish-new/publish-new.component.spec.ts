import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishNewComponent } from './publish-new.component';

describe('PublishNewComponent', () => {
  let component: PublishNewComponent;
  let fixture: ComponentFixture<PublishNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
