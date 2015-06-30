//
//  AuthService.swift
//  House
//
//  Created by Daniel Gorziglia on 6/23/15.
//  Copyright (c) 2015 Daniel Gorziglia. All rights reserved.
//

import Foundation
import Alamofire

class AuthService {
    
    func createUser(viewInstance: CreateAccountViewController) {
        println(viewInstance)
        // API Route
//        let route = ServiceConstants.baseUrl + ServiceConstants.Routes.signup
//    
//        // JSON Body
//        let parameters : [String : AnyObject] = [
//            "email": "test@test.com",
//            "password": "poop",
//            "name": [
//                "first": "Daniel",
//                "last": "Gorziglia"
//            ],
//            "phonenum": 2156220900
//        ]
//        
//        // Fetch Request
//        Alamofire.request(.POST, route,
//            parameters: parameters, encoding: .JSON)
//            .validate(statusCode: 200..<300)
//            .responseJSON{(request, response, JSON, error) in
//                if (error == nil)
//                {
//                    println("HTTP Response Body: \(JSON)")
//                }
//                else
//                {
//                    println("HTTP HTTP Request failed: \(error)")
//                }
//        }
        
    }
}