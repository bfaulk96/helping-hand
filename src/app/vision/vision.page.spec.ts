import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VisionPage} from './vision.page';

describe('VisionPage', () => {
    let component: VisionPage;
    let fixture: ComponentFixture<VisionPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VisionPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VisionPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
