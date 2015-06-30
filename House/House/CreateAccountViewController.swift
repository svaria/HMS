//
//  CreateAccountViewController.swift
//  House
//
//  Created by Daniel Gorziglia on 6/8/15.
//  Copyright (c) 2015 Daniel Gorziglia. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON
import CoreData

class CreateAccountViewController: UIViewController {
    
    @IBOutlet weak var fullnameField: AuthTextField!
    @IBOutlet weak var emailField: AuthTextField!
    @IBOutlet weak var passwordField: AuthTextField!
    @IBOutlet weak var createAccountButton: UIButton!
    
    // Helper methodss
    
    // This really should be in its own service
    func sendCreateAccount(email: String, password: String, fullName: String) {
        
        // Get first and last names
        var fullNameArr = split(fullName) {$0 == " "}
        var firstName: String = fullNameArr[0]
        var lastName: String = fullNameArr.count > 1 ? fullNameArr[1] : ""
        
        let route = ServiceConstants.baseUrl + ServiceConstants.Routes.signup

        // JSON Body
        let parameters : [String : AnyObject] = [
            "email": email,
            "password": password,
            "name": [
                "first": firstName,
                "last": lastName
            ]
        ]

        // Fetch Request
        Alamofire.request(.POST, route,
            parameters: parameters, encoding: .JSON)
            .validate(statusCode: 200..<300)
            .responseJSON{(request, response, json, error) in
                if (error == nil)
                {
                    if response!.statusCode == 200 {
                        var json = JSON(json!)
                        self.handleSuccessOnSignup(json, response: response!)
                    } else {
                        // TODO: check for duplicate email
                    }
                }
                else
                {
                    self.handleErrorOnSignup("Server Error. Please try again later.")
                }
        }
    }
    
    func handleErrorOnSignup(errorMessage: String) {
        let alertController: UIAlertController = UIAlertController(title: "Signup Error", message: errorMessage, preferredStyle: .Alert)
        
        // Create "ok" button
        let okAction: UIAlertAction = UIAlertAction(title: "Ok", style: .Cancel) { action -> Void in
            // Don't care if pressed
        }
        alertController.addAction(okAction)
        
        self.presentViewController(alertController, animated: true, completion: nil)
        
        // Re enable the button
        setCreateAccountButtonState(true)
    }
    
    func handleSuccessOnSignup(json: JSON, response: NSHTTPURLResponse) {
        // Gather info to store
        let userID = json["_id"].string
        let email = json["email"].string
        let firstName = json["name"]["first"].string
        let lastName = json["name"]["last"].string
        let authCookie = response.allHeaderFields["Set-Cookie"] as? String
        
        let appDelegate =
        UIApplication.sharedApplication().delegate as! AppDelegate
        let managedContext = appDelegate.managedObjectContext!
        
        let entity = NSEntityDescription.entityForName("User",
            inManagedObjectContext:
            managedContext)
        
        let user = NSManagedObject(entity: entity!,
            insertIntoManagedObjectContext:managedContext)
        
        // Populate the entity
        user.setValue(userID, forKey: "userID")
        user.setValue(email, forKey: "email")
        user.setValue(firstName, forKey: "firstName")
        user.setValue(lastName, forKey: "lastName")
        user.setValue(authCookie, forKey: "authCookie")
        
        // Save the data
        var error: NSError?
        if !managedContext.save(&error) {
            println("Could not save \(error)")
        } else {
            // Load SetupHouseViewController
            let vc = self.storyboard!.instantiateViewControllerWithIdentifier("SetupHouseViewController") as! UIViewController
            self.presentViewController(vc, animated: true, completion: nil)
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Make password textField secureText
        passwordField.secureTextEntry = true
    }
    
    func setCreateAccountButtonState(enabled: Bool) {
        if (enabled) {
            // Enable the button
            createAccountButton.enabled = true;
            
            // Change color to reflect enable state
            createAccountButton.backgroundColor = UIColor(
                red: 0/255,
                green: 183/255,
                blue: 158/255,
                alpha: 1/0
            )
        } else {
            // Disable the button
            createAccountButton.enabled = false
            
            // Change color of button to reflect disabled state
            createAccountButton.backgroundColor = UIColor(
                red: 151/255,
                green: 227/255,
                blue: 217/255,
                alpha: 1/0
            )
        }
    }
    
    // Called everytime the view appears
    override func viewDidAppear(animated: Bool) {
        // Clear the form everytime the view appears
        fullnameField.text = ""
        emailField.text = ""
        passwordField.text = ""
        
        setCreateAccountButtonState(false)
    }
    
    // Called when either of the form elements are edited
    @IBAction func editingChanged(sender: AnyObject) {
        if fullnameField.text != "" &&
            emailField.text != "" &&
            passwordField.text != "" {
            setCreateAccountButtonState(true)
        } else {
            setCreateAccountButtonState(false)
        }
    }
    
    // Returns true if the given string is a valid email address
    // Note: this is just a regex check, not a DNS lookup check
    func isValidEmail(testStr:String) -> Bool {
        let emailRegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}"
        
        let emailTest = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        return emailTest.evaluateWithObject(testStr)
    }
    
    // This action is only available when the button is enabled
    @IBAction func pressedCreateAccount(sender: UIButton) {
        var errorMessage = ""
        
        // Check for valid email
        if !isValidEmail(emailField.text) {
            errorMessage = "Please enter a valid email address"
        } else {
            setCreateAccountButtonState(false)
            createAccountButton.setTitle("Creating Account...", forState: .Disabled)
        }
        
        // Check for network connection
        if !Reachability.isConnectedToNetwork() {
            errorMessage = "Could not reach network. Please check your internet connection and try again."
        }
        
        // Show an alert if there was an error
        if errorMessage != "" {
            self.handleErrorOnSignup(errorMessage)
        } else {
            // Make the call to create the account
            sendCreateAccount(emailField.text, password: passwordField.text, fullName: fullnameField.text)
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func returnToSignIn(sender: UIButton) {
        self.dismissViewControllerAnimated(true, completion: nil);
    }
}

