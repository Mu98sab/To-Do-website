import { validateEmail } from '../util/validation';

describe( "Testing email validation", () => {

    // invalid emails
    test( "Testing invalid emails", () => {

        expect( validateEmail( "email@d.d" ) ).toBeFalsy();        
        expect( validateEmail( "email" ) ).toBeFalsy();
        expect( validateEmail( "email@d" ) ).toBeFalsy();
    
    });

    // valid emails
    test( "Testing valid emails", () => {
        expect( validateEmail( "email@dd.dd" ) ).toBeTruthy();
        expect( validateEmail( "email@dd.ff.ff" ) ).toBeTruthy();
        expect( validateEmail( "email.me@dd.ff.ff" ) ).toBeTruthy();
    });

});


