//
//  CreateAccountViewController.swift
//  House
//
//  Created by Daniel Gorziglia on 6/8/15.
//  Copyright (c) 2015 Daniel Gorziglia. All rights reserved.
//

import UIKit

class CreateAccountViewController: UIViewController {
    
    @IBOutlet weak var fullnameField: AuthTextField!
    @IBOutlet weak var emailField: AuthTextField!
    @IBOutlet weak var passwordField: AuthTextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        // Make password textField secureText
        passwordField.secureTextEntry = true
    }
    
    override func viewDidAppear(animated: Bool) {
        // Clear the login form everytime the view appears
        passwordField.text = ""
    }
    
    @IBAction func editingChanged(sender: AnyObject) {
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func returnToSignIn(sender: UIButton) {
        self.dismissViewControllerAnimated(true, completion: nil);
    }
}

