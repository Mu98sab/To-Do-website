const { loginFetch } = require("../util/test.helper");


describe( "Testing Login Auth Route", () => {
    
    test("Login Route: empty email", () => {
        const newUser = {
            password: "1234567489"
        };

        return loginFetch( newUser )
        .then( ( res ) => {
            expect( res.status ).toBeGreaterThanOrEqual( 400 );
            return res.json();
        })
        .then( ( json ) => {
            expect( json.errors.email ).toBe( "Email cannot be empty" );
        });
    });

    test("Login Route: empty password", () => {
        const newUser = {
            email: "test@gmail.com"
        };

        return loginFetch( newUser )
        .then( ( res ) => {
            expect( res.status ).toBeGreaterThanOrEqual( 400 );
            return res.json();
        })
        .then( ( json ) => {
            expect( json.errors.password ).toBe( "Password cannot be empty" );
        });
    });

    test("Login Route: email not registered", () => {
        const newUser = {
            email: "testNotRegister@gmail.com",
            password: "1234567489"
        };

        return loginFetch( newUser )
        .then( ( res ) => {
            expect( res.status ).toBeGreaterThanOrEqual( 400 );
            return res.json();
        })
        .then( ( json ) => {
            expect( json.errors.email ).toBe( "Email is not registered" );
        });
    });

    test("Login Route: password not correct", () => {
        const newUser = {
            email: "test@gmail.com",
            password: "moosaab1998"
        };

        return loginFetch( newUser )
        .then( ( res ) => {
            expect( res.status ).toBeGreaterThanOrEqual( 400 );
            return res.json();
        })
        .then( ( json ) => {
            expect( json.errors.password ).toBe( "Incorrect password" );
        });
    });

    test("Login Route: no issues login user", () => {
        const newUser = {
            email: "test@gmail.com",
            password: "1234567489"
        };

        return loginFetch( newUser )
        .then( ( res ) => {
            expect( res.status ).toBe( 204 );
            return res.json();
        })
        .then( ( json ) => {
            console.log( json );
            expect( json ).toEqual( {} );
        })
        .catch( ( err ) => {
            console.log( err );
        });
    });
});