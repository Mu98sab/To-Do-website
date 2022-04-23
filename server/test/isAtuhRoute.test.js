const { axiosInstance } = require("../util/test.helper")


describe( "Testing Is Auth Route", () => {

    test( "Is auth after login", () => {
        return axiosInstance.post(
            "/login",
            {
                email: "test@gmail.com",
                password: "1234567489"
            }
        )
        .then( ( res ) => {
            
            return axiosInstance.get(
                "is-authenticated",
                {
                    headers: {
                        "Cookie": res.headers["set-cookie"][0]
                    }
                }
            )
            .then( ( res2 ) => {

                expect( res2.status ).toBe( 200 )
            });
        });
        
        
    })

    test( "Is auth after register", () => {

        return axiosInstance.post(
            "/register",
            {
                email: "test2@gmail.com",
                name: "test",
                password: "1234567489"
            }
        )
        .then( ( res ) => {
            return axiosInstance.get( 
                "is-authenticated",
                {
                    headers: {
                        "Cookie": res.headers["set-cookie"][0]
                    }
                }
            )
            .then( ( res2 ) => {
                expect( res2.status ).toBe( 200 )

                return axiosInstance.delete(
                    "/user",
                    {
                        headers: {
                            "Cookie": res.headers["set-cookie"][0]
                        }
                    }
                )
            });
        });
        
    })
    
    test( "Is auth without login", () => {
        axiosInstance.get( "is-authenticated" )
        .then( ( res ) => {
            expect( res.status ).toBe( 401 );
        });
    })
})