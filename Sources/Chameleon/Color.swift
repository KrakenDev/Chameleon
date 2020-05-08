import Foundation

/**
 An exact representation of the data contained in the Contents.json file within `.colorset` folders that are created inside of `.xcassets`
 */
struct ColorSet: Codable {
    struct Color: Codable {
        enum Space: String, Codable {
            case srgb
        }
        struct Value: Codable {
            struct RGB: Codable {
                let red: String
                let green: String
                let blue: String
                let alpha: String
            }
            let colorSpace: Space
            let components: RGB
        }
        struct Appearance: Codable {
            enum Value: String, Codable, CaseIterable {
                case dark, high, light
            }
            enum Mode: String, Codable {
                case luminosity, contrast
            }
            let appearance: Mode
            let value: Value
        }
        enum Idiom: String, Codable {
            case universal
        }
        let color: Value
        let idiom: Idiom = .universal
        var appearances: [Color.Appearance]?
    }
    let info = Contents.Info()
    var colors: [Color]
}
