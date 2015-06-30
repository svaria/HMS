//
//  ViewController.swift
//  House
//
//  Created by Daniel Gorziglia on 6/8/15.
//  Copyright (c) 2015 Daniel Gorziglia. All rights reserved.
//

import UIKit
import CoreData

class SignInViewController: UIViewController {
    
    @IBOutlet weak var emailField: AuthTextField!
    @IBOutlet weak var passwordField: AuthTextField!
    @IBOutlet weak var createAccountButton: UIButton!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        // Make password textField secureText
        passwordField.secureTextEntry = true
        
        // Add border to button
        createAccountButton.layer.borderColor = UIColor(
            red: 33/255,
            green: 163/255,
            blue: 146/255,
            alpha: 1/0
        ).CGColor
        
        // Register keyboard notification
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "keyboardNotification:", name: UIKeyboardWillChangeFrameNotification, object: nil)
    }
    
    deinit {
        NSNotificationCenter.defaultCenter().removeObserver(self)
    }
    
    // Check to see if we are logged in
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        

    }
    
    override func viewDidAppear(animated: Bool) {
        // Clear the login form everytime the view appears
        emailField.text = ""
        passwordField.text = ""
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func pressedSignIn(sender: UIButton) {
        // Collect input values
        var email = emailField.text
        var password = passwordField.text
        var isValidLogin = false
        
        if (email == "" || password == "") {
            isValidLogin = false;
        }
        
        if email == "poop" && password == "dolla" {
            isValidLogin = true
        } else {
            isValidLogin = false
        }
        
        // Show alert if login is incorrect
        if !isValidLogin {
            let alertController: UIAlertController = UIAlertController(title: "Invalid Login", message: "Invalid email and/or password", preferredStyle: .Alert)
            
            // Create "ok" button
            let okAction: UIAlertAction = UIAlertAction(title: "Ok", style: .Cancel) { action -> Void in
                // Don't care if pressed
            }
            alertController.addAction(okAction)
            
            self.presentViewController(alertController, animated: true, completion: nil)
        }
    }
    
    func keyboardNotification(notification: NSNotification) {
        if let userInfo = notification.userInfo {
            // Collect frame information and determine if keyboard moved up or down
            let beginFrame = (userInfo[UIKeyboardFrameBeginUserInfoKey]
                as? NSValue)?.CGRectValue()
            let endFrame = (userInfo[UIKeyboardFrameEndUserInfoKey]
                as? NSValue)?.CGRectValue()
            var didOpen = beginFrame?.origin.y > endFrame?.origin.y;
            
            // Collect animation curve information to match
            let duration:NSTimeInterval = (userInfo[UIKeyboardAnimationDurationUserInfoKey] as? NSNumber)?.doubleValue ?? 0
            let animationCurveRawNSN = userInfo[UIKeyboardAnimationCurveUserInfoKey] as? NSNumber
            let animationCurveRaw = animationCurveRawNSN?.unsignedLongValue ?? UIViewAnimationOptions.CurveEaseInOut.rawValue
            let animationCurve:UIViewAnimationOptions = UIViewAnimationOptions(rawValue: animationCurveRaw)
            
            // Move view
            var frameHeight = endFrame?.size.height ?? 0.0
            UIView.animateWithDuration(duration,
                delay: NSTimeInterval(0),
                options: animationCurve,
                animations: {
                    self.view.frame.origin.y = 0.0
                    if (didOpen) {
                        self.view.frame.origin.y -= frameHeight - 40.0
                    } else {
                        self.view.frame.origin.y = 0.0
                    }
                },
                completion: nil)
        }
    }
}

