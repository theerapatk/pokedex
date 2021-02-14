import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { HttpResponseInterceptor } from './http-response.interceptor';

describe('HttpResponseInterceptor', () => {

    let interceptor: HttpResponseInterceptor;

    const toastrService = jasmine.createSpyObj('ToastrService', ['error']);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [{
                provide: ToastrService,
                useValue: toastrService
            }]
        })
            .compileComponents();
    });

    beforeEach(() => {
        interceptor = new HttpResponseInterceptor(TestBed.inject(ToastrService));
    });

    it('should create', () => {
        expect(interceptor).toBeTruthy();
    });

});
