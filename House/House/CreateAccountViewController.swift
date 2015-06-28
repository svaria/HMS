//
//  CreateAccountViewController.swift
//  House
//
//  Created by Daniel Gorziglia on 6/8/15.
//  Copyright (c) 2015 Daniel Gorziglia. All rights reserved.
//

import UIKit
import Alamofire

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
        
//        let route = ServiceConstants.baseUrl + ServiceConstants.Routes.signup
//
//        // JSON Body
//        let parameters : [String : AnyObject] = [
//            "email": ,
//            "password": "poop",
//            "name": [
//                "first": "Daniel",
//                "last": "Gorziglia"
//            ]
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
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
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
        
        // Make the call to create the account
        sendCreateAccount(emailField.text, password: passwordField.text, fullName: fullnameField.text)
        
        
        // Show an alert if there was an error
        if errorMessage != "" {
            let alertController: UIAlertController = UIAlertController(title: "Signup Error", message: errorMessage, preferredStyle: .Alert)
            
            // Create "ok" button
            let okAction: UIAlertAction = UIAlertAction(title: "Ok", style: .Cancel) { action -> Void in
                // Don't care if pressed
            }
            alertController.addAction(okAction)
            
            self.presentViewController(alertController, animated: true, completion: nil)
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

