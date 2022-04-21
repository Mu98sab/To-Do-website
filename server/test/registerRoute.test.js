import { registerFetch } from '../util/test.helper';


// increase the time for test to be fail since we are dealing with promices
jest.setTimeout(60000);

describe( "Testing Register Auth Routes", () => {

    // will fail if email is already there
    test( "Register Route: no issues",  () => {
        const newUser = {
            email: "test@gmail.com",
            name: "test",
            password: "1234567489"
        };

        return registerFetch( newUser )
        .then( ( res ) => {
            expect( res.status ).toBe( 201 );
            return res.json();
        });
    });

    test( "Register Route: empty email",  () => {
        const newUser = {
            email: "",
            name: "test",
            password: "1234567489"
        };

        return registerFetch( newUser )
        .then( ( res ) => {
            //console.log( res );
            expect( res.status ).toBeGreaterThanOrEqual( 400 );
            return res.json();
        })
        .then( (json) => {
            expect( json.errors.email ).toBe( "Email cannot be empty" );
        });
    });

    test( "Register Route: empty password",  () => {
        const newUser = {
            email: "test2@gmail.com",
            name: "test",
        };

        return registerFetch( newUser )
        .then( ( res ) => {
            //console.log( res );
            expect( res.status ).toBeGreaterThanOrEqual( 400 );
            return res.json();
        })
        .then( (json) => {
            expect( json.errors.password ).toBe( "Password cannot be empty" );
        });
    });

    test( "Register Route: Invalid email (no @ char)",  () => {
        const newUser = {
            email: "test2\"gmail.com",
            name: "test",
            password: "1234567489"
        };

        return registerFetch( newUser )
        .then( ( res ) => {
            //console.log( res );
            expect( res.status ).toBeGreaterThanOrEqual( 400 );
            return res.json();
        })
        .then( (json) => {
            expect( json.errors.email ).toBe( "Invalid email" );
        });
    });

    test( "Register Route: Invalid email (no . char)",  () => {
        const newUser = {
            email: "test2@gmail",
            name: "test",
            password: "1234567489"
        };

        return registerFetch( newUser )
        .then( ( res ) => {
            //console.log( res );
            expect( res.status ).toBeGreaterThanOrEqual( 400 );
            return res.json();
        })
        .then( (json) => {
            expect( json.errors.email ).toBe( "Invalid email" );
        });
    });

    test( "Register Route: Invalid email (one char after .)",  () => {
        const newUser = {
            email: "test2@gmail.c",
            name: "test",
            password: "1234567489"
        };

        return registerFetch( newUser )
        .then( ( res ) => {
            //console.log( res );
            expect( res.status ).toBeGreaterThanOrEqual( 400 );
            return res.json();
        })
        .then( (json) => {
            expect( json.errors.email ).toBe( "Invalid email" );
        });
    });

    test( "Register Route: Invalid email (no char before the @ char)",  () => {
        const newUser = {
            email: "@gmail.com",
            name: "test",
            password: "1234567489"
        };

        return registerFetch( newUser )
        .then( ( res ) => {
            //console.log( res );
            expect( res.status ).toBeGreaterThanOrEqual( 400 );
            return res.json();
        })
        .then( (json) => {
            expect( json.errors.email ).toBe( "Invalid email" );
        });
    });

    test( "Register Route: name not exist",  () => {
        const newUser = {
            email: "test2@gmail.com",
            password: "1234567489"
        };

        return registerFetch( newUser )
        .then( ( res ) => {
            //console.log( res );
            expect( res.status ).toBeGreaterThanOrEqual( 400 );
            return res.json();
        })
        .then( (json) => {
            expect( json.errors.name ).toBe( "Name cannot be empty" );
        });
    });

    test( "Register Route: name exists but empty",  () => {
        const newUser = {
            email: "test2\"gmail.com",
            name: "",
            password: "1234567489"
        };

        return registerFetch( newUser )
        .then( ( res ) => {
            //console.log( res );
            expect( res.status ).toBeGreaterThanOrEqual( 400 );
            return res.json();
        })
        .then( (json) => {
            expect( json.errors.name ).toBe( "Name cannot be empty" );
        });
    });

    test( "Register Route: too short password",  () => {
        const newUser = {
            email: "test2\"gmail.com",
            name: "test",
            password: "1234"
        };

        return registerFetch( newUser )
        .then( ( res ) => {
            //console.log( res );
            expect( res.status ).toBeGreaterThanOrEqual( 400 );
            return res.json();
        })
        .then( (json) => {
            expect( json.errors.password ).toBe( "Password is too short, password must be at least 8 charecter" );
        });
    });

    test( "Register Route: all fields empty",  () => {
        const newUser = {};

        return registerFetch( newUser )
        .then( ( res ) => {
            //console.log( res );
            expect( res.status ).toBeGreaterThanOrEqual( 400 );
            return res.json();
        })
        .then( (json) => {
            expect( json.errors ).toEqual( {
                password: "Password cannot be empty",
                email: "Email cannot be empty",
                name: "Name cannot be empty"
            });
        });
    });

    test( "Register Route: email already exist",  () => {
        const newUser = {
            email: "test@gmail.com",
            name: "test",
            password: "1234567489"
        };

        return registerFetch( newUser )
        .then( ( res ) => {
            //console.log( res );
            expect( res.status ).toBeGreaterThanOrEqual( 400 );
            return res.json();
        })
        .then( (json) => {
            expect( json.errors.email ).toBe("This email is already registered");
        });
    });

});