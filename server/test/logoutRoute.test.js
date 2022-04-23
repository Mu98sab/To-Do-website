import { axiosInstance } from "../util/test.helper";

describe( "Testing Logout Auth Route", () => {

    test( "Logout after login", () => {

        // TODO: login then save the header then log out y passing the header
        return axiosInstance.post(
            "/login",
            {
                email: "test@gmail.com",
                password: "1234567489"
            }
        ).then( ( res ) => {
            
            return axiosInstance.get( 
                "/logout", 
                {
                    headers: {
                        "Cookie": res.headers["set-cookie"][0]
                    },
                }
            )
            .then( ( res2 ) => {
                expect( res2.status ).toBe( 204 ); 
            })
        });
        
    });

    test( "Logout without login", () => {

        axiosInstance.get(
            "/logout",
        )
        .then( ( res ) => {
            expect( res.status ).toBe( 401 );
        })
    });
});