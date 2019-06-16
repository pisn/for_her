import { TestBed } from '@angular/core/testing';
import { CognitoServiceService } from './cognito-service.service';
describe('CognitoServiceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(CognitoServiceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=cognito-service.service.spec.js.map