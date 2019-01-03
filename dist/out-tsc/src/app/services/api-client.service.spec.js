import { TestBed } from '@angular/core/testing';
import { ApiClientService } from './api-client.service';
describe('ApiClientService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ApiClientService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=api-client.service.spec.js.map