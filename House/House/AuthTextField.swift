//
//  AuthTextField.swift
//  House
//
//  Created by Daniel Gorziglia on 6/9/15.
//  Copyright (c) 2015 Daniel Gorziglia. All rights reserved.
//

import Foundation
import UIKit

public class AuthTextField: UITextField {
    
    let padding = UIEdgeInsets(top: 5, left: 10, bottom: 0, right: 0);
    
    override public func textRectForBounds(bounds: CGRect) -> CGRect {
        return self.newBounds(bounds)
    }
    
    override public func placeholderRectForBounds(bounds: CGRect) -> CGRect {
        return self.newBounds(bounds)
    }
    
    override public func editingRectForBounds(bounds: CGRect) -> CGRect {
        return self.newBounds(bounds)
    }
    
    private func newBounds(bounds: CGRect) -> CGRect {
        var newBounds = bounds
        newBounds.origin.x += padding.left
        newBounds.origin.y += padding.top
        newBounds.size.height -= (padding.top * 2) - padding.bottom
        newBounds.size.width -= (padding.left * 2) - padding.right
        return newBounds
    }
}