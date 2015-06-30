//
//  User.swift
//  House
//
//  Created by Daniel Gorziglia on 6/28/15.
//  Copyright (c) 2015 Daniel Gorziglia. All rights reserved.
//

import Foundation
import CoreData

class User: NSManagedObject {

    @NSManaged var authCookie: String
    @NSManaged var email: String
    @NSManaged var firstName: String
    @NSManaged var lastName: String
    @NSManaged var userID: String
    @NSManaged var houseID: Int

}
