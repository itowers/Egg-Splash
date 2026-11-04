import UIKit
import GameKit
import Capacitor

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = GameViewController()
        window?.makeKeyAndVisible()

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}

/// Tela do jogo: a WebView do Capacitor em tela cheia, sem barra de status e com o
/// indicador de início escondido (os botões do jogo ficam perto da borda de baixo).
class GameViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        bridge?.registerPluginInstance(GameCenterPlugin())
    }

    override var prefersHomeIndicatorAutoHidden: Bool { true }

    // Um toque perto da borda de baixo vai para o jogo, não para o gesto de voltar ao início.
    override var preferredScreenEdgesDeferringSystemGestures: UIRectEdge { .bottom }
}

/// Game Center: entrar, enviar o recorde e mostrar o placar.
/// No JS: Capacitor.Plugins.GameCenter.signIn() / submitScore({score}) / showLeaderboard()
@objc(GameCenterPlugin)
public class GameCenterPlugin: CAPPlugin, CAPBridgedPlugin, GKGameCenterControllerDelegate {
    public let identifier = "GameCenterPlugin"
    public let jsName = "GameCenter"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "signIn", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "submitScore", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showLeaderboard", returnType: CAPPluginReturnPromise)
    ]

    /// Tem que ser igual ao ID do placar criado no App Store Connect.
    static let leaderboardID = "eggsplash.pontos"

    @objc func signIn(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            GKLocalPlayer.local.authenticateHandler = { [weak self] loginVC, _ in
                if let loginVC = loginVC {
                    self?.bridge?.viewController?.present(loginVC, animated: true)
                }
            }
        }
        call.resolve()
    }

    @objc func submitScore(_ call: CAPPluginCall) {
        let score = call.getInt("score") ?? 0
        guard GKLocalPlayer.local.isAuthenticated, score > 0 else {
            call.resolve(["sent": false])
            return
        }
        GKLeaderboard.submitScore(score, context: 0, player: GKLocalPlayer.local,
                                  leaderboardIDs: [GameCenterPlugin.leaderboardID]) { error in
            call.resolve(["sent": error == nil])
        }
    }

    @objc func showLeaderboard(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard GKLocalPlayer.local.isAuthenticated else {
                call.resolve(["shown": false])
                return
            }
            let gcVC = GKGameCenterViewController(leaderboardID: GameCenterPlugin.leaderboardID,
                                                  playerScope: .global, timeScope: .allTime)
            gcVC.gameCenterDelegate = self
            self.bridge?.viewController?.present(gcVC, animated: true)
            call.resolve(["shown": true])
        }
    }

    public func gameCenterViewControllerDidFinish(_ gameCenterViewController: GKGameCenterViewController) {
        gameCenterViewController.dismiss(animated: true)
    }
}
