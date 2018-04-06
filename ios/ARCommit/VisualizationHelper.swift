//
//  VisualizationHelper.swift
//  CVProject
//
//  Created by modao on 2018/4/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation
import UIKit
import SceneKit

class VisualizationHelper {

  static let shared = VisualizationHelper()

  let COMMIT_TILE_SIZE_PERCETAGE: CGFloat = 0.85
  let COMMIT_FONT_SIZE_PERCETAGE: CGFloat = 0.6
  let TopMargin: CGFloat = 4.0
  let BottomMargin: CGFloat = 4.0
  let COMMIT_IMAGE_RIGHT_MARGIN: CGFloat = 4
  let COMMIT_IMAGE_LEFT_MARGIN: CGFloat = 4
  let COMMIT_VERTIAL_TILE_NUM: CGFloat = 8
  let WEEKS_IN_YEAR: CGFloat = 52
  let months = ["J","F","M","A","M","J","J","A","S","O","N","D"]

  func commitImageWithRect(rect: CGRect) -> UIImage? {
    var im: UIImage?
    guard let data = GitHubCommitHelper.shared.fetchCommit() else { return im }
    UIGraphicsBeginImageContextWithOptions(rect.size, false, 0)
    UIColor.clear.setFill()
    let squareBlankSize = (rect.size.height - TopMargin - BottomMargin) / COMMIT_VERTIAL_TILE_NUM
    let squareSize = squareBlankSize * COMMIT_TILE_SIZE_PERCETAGE

    let context = UIGraphicsGetCurrentContext()

    let frameWidth = rect.width - COMMIT_IMAGE_LEFT_MARGIN - COMMIT_IMAGE_RIGHT_MARGIN
    let width = Int(frameWidth / squareBlankSize >= WEEKS_IN_YEAR ? WEEKS_IN_YEAR - 1 : frameWidth / squareBlankSize)
    for weekFromNow in 0..<width {
      let week = data[weekFromNow]
      week.forEach { day in
        let rec = CGRect(x: rect.width-COMMIT_IMAGE_RIGHT_MARGIN-CGFloat(weekFromNow+1)*squareBlankSize,
                         y: TopMargin+CGFloat(day.weekDay-1)*squareBlankSize,
                         width: squareSize,
                         height: squareSize)
        day.color.setFill()
        context?.fill(rec)
      }
      let attributes: [String: Any] = [
        NSFontAttributeName: UIFont.systemFont(ofSize: squareSize * COMMIT_FONT_SIZE_PERCETAGE),
        NSStrokeWidthAttributeName: 0,
        NSForegroundColorAttributeName: UIColor.lightGray
      ]
      let monthName = months[week.first!.month-1]
      let x = rect.width-COMMIT_IMAGE_RIGHT_MARGIN-CGFloat(weekFromNow+1)*squareBlankSize+squareSize*(1.0-COMMIT_FONT_SIZE_PERCETAGE)/2.0
      let y = TopMargin+(COMMIT_VERTIAL_TILE_NUM-1)*squareBlankSize
      (monthName as NSString).draw(at: CGPoint(x: x, y: y), withAttributes: attributes)
    }
    im = UIGraphicsGetImageFromCurrentImageContext()
    return im
  }

  func commitScenceWithRect(rect: CGRect) -> SCNScene? {
    let scence = SCNScene()

    let light = SCNLight()
    light.type = .directional
    light.color = UIColor(white: 1.0, alpha: 2.0)
    light.shadowColor = UIColor(white: 0.0, alpha: 0.8).cgColor
    let lightNode = SCNNode()
    lightNode.eulerAngles = SCNVector3Make(-.pi/3, .pi/4*3, 0)
    lightNode.light = light
    scence.rootNode.addChildNode(lightNode)

    let ambientLight = SCNLight()
    ambientLight.type = .ambient
    ambientLight.color = UIColor(white: 0.8, alpha: 0.4)
    let ambientLightNode = SCNNode()
    ambientLightNode.light = ambientLight
    scence.rootNode.addChildNode(ambientLightNode)

    let cameraNode = SCNNode()
    cameraNode.name = "cameraNode"
    cameraNode.camera = SCNCamera()
    cameraNode.camera?.automaticallyAdjustsZRange = true
    cameraNode.camera?.usesOrthographicProjection = true
    cameraNode.eulerAngles = SCNVector3Make(-.pi/6, .pi/4, 0)
    scence.rootNode.addChildNode(cameraNode)

    let barNode = SCNNode()
    barNode.name = "barNode"
    barNode.position = SCNVector3Make(0, 0, 0)
    scence.rootNode.addChildNode(barNode)

    guard let weeks = GitHubCommitHelper.shared.fetchCommit() else {
      return scence
    }
    cameraNode.camera?.orthographicScale = 11.0 - Double(rect.width - 320)/80
    cameraNode.position = SCNVector3Make(.pi/4*50-15*1.5, .pi/6*50+2, .pi/4*50)
    for (weekFromNow, week) in weeks.enumerated() {
      week.forEach({ day in
        let box = SCNBox(width: 1, height: CGFloat(day.count+1), length: 1, chamferRadius: 0)
        let node = SCNNode(geometry: box)
        let mat = SCNMaterial()
        mat.diffuse.contents = day.color
        box.materials = [mat]
        node.position = SCNVector3Make(-Float(weekFromNow)*1.5, Float(box.height/2), Float(day.weekDay)*1.5)
        barNode.addChildNode(node)
      })
    }
    return scence
  }
}

final class CVCommitImageView: UIImageView {

  override func layoutSubviews() {
    super.layoutSubviews()
    backgroundColor = .clear
    image = VisualizationHelper.shared.commitImageWithRect(rect: frame)
  }

  override func layerWillDraw(_ layer: CALayer) {
    super.layerWillDraw(layer)
    layer.contentsFormat = kCAContentsFormatRGBA8Uint
  }
}

final class CVCommitScenceView: SCNView {

  override func layoutSubviews() {
    super.layoutSubviews()
    backgroundColor = .clear
    if let scn = VisualizationHelper.shared.commitScenceWithRect(rect: frame) {
      scene = scn
      for node in scn.rootNode.childNodes where node.name == "cameraNode" {
        pointOfView = node
      }
    }
  }

  override func layerWillDraw(_ layer: CALayer) {
    super.layerWillDraw(layer)
    layer.contentsFormat = kCAContentsFormatRGBA8Uint
  }
}
