//
//  CommitViewController.swift
//  CVProject
//
//  Created by modao on 2018/4/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import UIKit
import ARKit

final class CommitViewController: UIViewController {

  @IBOutlet weak var scenceView: ARSCNView!
  var floorNode: SCNNode?
  var currentPlane: SCNNode?
  var commitBarNode: SCNNode?
  var commits = [GithubCommitData]()
  let factor: Float = 0.03
  let backButton = UIButton(frame: CGRect(x: 30, y: 30, width: 60, height: 30))
  var commitWeekCount: Int { return (commits.count + 6)/7 }

  override func loadView() {
    super.loadView()
    backButton.backgroundColor = .customYellow
    backButton.titleLabel?.font = .systemFont(ofSize: 15)
    backButton.setTitleColor(.white, for: .normal)
    backButton.layer.cornerRadius = 4.0
    backButton.layer.masksToBounds = true
    backButton.addTarget(self,
                         action: #selector(CommitViewController.backAction(_:)),
                         for: .touchUpInside)
    view.addSubview(backButton)
  }

  override func viewDidLoad() {
    super.viewDidLoad()
    scenceView.delegate = self
    scenceView.automaticallyUpdatesLighting = false
    if let data = GitHubCommitHelper.shared.fetchCommitForAR() {
      commits.append(contentsOf: data)
    }
  }

  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    let configuration = ARWorldTrackingConfiguration()
    configuration.planeDetection = .horizontal
    configuration.isLightEstimationEnabled = true
    scenceView.session.run(configuration)
    alert(message: "移动手机，寻找平面")
  }

  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    scenceView.session.pause()
  }

  @objc func backAction(_ sender: UIButton?) {
    dismiss(animated: true, completion: nil)
  }
}

extension CommitViewController: ARSCNViewDelegate {

  func enableEnvironmentMap(withIntensity intensity: CGFloat) {
    if scenceView.scene.lightingEnvironment.contents == nil,
      let environmentMap = UIImage(named: "Media.scnassets/environment_blur.exr") {
      scenceView.scene.lightingEnvironment.contents = environmentMap
    }
    scenceView.scene.lightingEnvironment.intensity = intensity
  }

  fileprivate func anyPlaneFrom(location: CGPoint) -> (plane: SCNNode, position: SCNVector3)? {
    let results = scenceView.hitTest(location, types: .existingPlaneUsingExtent)
    guard results.count > 0,
      let anchor = results.first?.anchor,
      let node = scenceView.node(for: anchor) else {
        alert(message: "请换个平面")
        return nil
    }
    return (node, results.first!.worldTransform.toPosition)
  }

  fileprivate func addFloor(at node: SCNNode, with position: SCNVector3) {
    let floor = SCNFloor()
    floor.reflectivity = 0
    let material = SCNMaterial()
    material.diffuse.contents = UIColor.white
    material.colorBufferWriteMask = SCNColorMask(rawValue: 0)
    floor.materials = [material]

    floorNode = SCNNode(geometry: floor)
    floorNode?.position = position
    node.addChildNode(floorNode!)
  }

  func renderer(_ renderer: SCNSceneRenderer, updateAtTime time: TimeInterval) {
    DispatchQueue.main.async { [weak self] in
      if let lightEstimated = self?.scenceView.session.currentFrame?.lightEstimate {
        self?.enableEnvironmentMap(withIntensity: lightEstimated.ambientIntensity / 50)
      } else {
        self?.enableEnvironmentMap(withIntensity: 25)
      }
    }
  }

  fileprivate func createNodes(with commits: [GithubCommitData],
                               at position: SCNVector3,
                               in node: SCNNode) {
    let light = SCNLight()
    light.type = .directional
    light.color = UIColor(white: 1.0, alpha: 2.0)
    light.shadowColor = UIColor(white: 0.0, alpha: 0.8).cgColor
    let lightNode = SCNNode()
    lightNode.eulerAngles = SCNVector3Make(-.pi/3, .pi/4, 0)

    let ambientLight = SCNLight()
    ambientLight.type = .ambient
    ambientLight.color = UIColor(white: 0.8, alpha: 0.4)
    let ambientNode = SCNNode()
    ambientNode.light = ambientLight
    node.addChildNode(ambientNode)

    commitBarNode = SCNNode()
    commitBarNode?.name = "barNode"
    commitBarNode?.position = position
    node.addChildNode(commitBarNode!)

    var totalCount = 0
    for weekFromNow in 0..<commitWeekCount {
      for i in 0...6 {
        totalCount += 1
        guard totalCount <= commits.count else { return }

        let commitData = commits[weekFromNow * 7 + i]
        let box = SCNBox(width: CGFloat(factor),
                         height: CGFloat(factor) * (CGFloat(commitData.count) + 1.0),
                         length: CGFloat(factor),
                         chamferRadius: 0.0)
        let node = SCNNode(geometry: box)
        let material = SCNMaterial()
        material.diffuse.contents = commitData.color
        box.materials = [material]
        node.position = SCNVector3Make(Float(i)*1.5*factor,
                                       Float(box.height)/2.0,
                                       Float(weekFromNow)*1.5*factor)
        commitBarNode?.addChildNode(node)
      }
    }
    let pointOfViewRotation = scenceView.pointOfView?.rotation
    commitBarNode?.rotation = SCNVector4Make(0, pointOfViewRotation?.y ?? 0, 0,
                                             pointOfViewRotation?.w ?? 0)
  }

  func renderer(_ renderer: SCNSceneRenderer, didAdd node: SCNNode, for anchor: ARAnchor) {
    if let planeAnchor = anchor as? ARPlaneAnchor {
      if currentPlane == nil {
        currentPlane = node
        addFloor(at: node, with: SCNVector3(planeAnchor.center.x, 0, planeAnchor.center.z))
        createNodes(with: commits,
                    at: SCNVector3(x: floorNode!.position.x,
                                   y: floorNode!.position.y,
                                   z: floorNode!.position.z-Float(commitWeekCount)*0.75*factor),
                    in: node)
      }
    }
  }
}
