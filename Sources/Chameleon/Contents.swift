import Foundation
import PathKit

// A type that represents the contents of a directory's Contents.json file within an .xcassets folder (including the .xcassets folder itself)
struct Contents: Codable {
    struct Info: Codable {
        enum Author: String, Codable {
            case xcode
        }
        let version: Int = 1
        let author: Author = .xcode
    }
    struct Properties: Codable {
        let providesNamespace: Bool
    }

    let info: Info
    let properties: Properties?

    // Convenience initializer that allows you namespace a folder's contents without having to create a Contents.Properties instance from scratch
    init(info: Info = .init(), isNamespace: Bool = false) {
        self.info = info
        self.properties = isNamespace ? .init(providesNamespace: true) : nil
    }
}
