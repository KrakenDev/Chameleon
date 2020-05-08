import Foundation
import PathKit

// Representation of the PAYLOAD_CONTEXT sent through by the Github Actions we have defined in this repo
struct Figma: Codable {
    struct Color: Codable {
        struct RGB: Codable {
            let r: Double
            let g: Double
            let b: Double
        }
        let name: String
        let value: RGB
    }

    // Create the figma context payload from the environment variable passed through by Github Actions or the sample test data you can find at the bottom of this file if running this script in Xcode (since it sucks to edit the scheme to edit the environment variable in xcode every time)
    static let payload = ProcessInfo.processInfo
        .environment["PAYLOAD_CONTEXT"] ?? testData
    let colors: [Color]

    init() {
        guard let data = Figma.payload.data(using: .utf8) else {
            fatalError()
        }

        // Translate figma payload into type safe container
        self = try! JSONDecoder().decode(Figma.self, from: data)
    }
}

extension Figma.Color {
    /// Convenience initializer that converts `Figma.Color` instances to the xcasset representation of a color set
    var colorset: ColorSet.Color {
        var color = ColorSet.Color(
            color: .init(
                colorSpace: .srgb,
                components: .init(
                    red: value.r.description,
                    green: value.g.description,
                    blue: value.b.description,
                    alpha: "1.000"
                )
            ),
            appearances: Path(name.lowercased())
                .components.compactMap(ColorSet.Color.Appearance.Value.init)
                .compactMap(to: \.appearance)
        )

        /// Xcode luminosity appearances default to `.light` so if the appearances created only contain a `.light` appearance, remove it so that way we can have this color represent _any_ appearance. This prevents any weird crashes when xcode decides to introduce appearances other than `.dark` or `.light`.
        if color.appearances?.count == 1 && color.appearances?.first?.value == .light {
            color.appearances = nil
        }
        return color
    }

    /**
     The figma color names are things like "Dark/Accent/Primary" or "Dark/Accent/Primary/High" (for high contrast versions).

     Since .xcassets model all appearances within the same color semantic, we need to filter out the appearances first.
     */
    var colorsetPath: Path {
        /// First convert every appearance value to their rawValues so we can compare against them when filtering
        let allValues = ColorSet.Color.Appearance.Value
            .allCases.map(to: \.rawValue)

        /// First, convert the name to a Path representation, then access the path components using PathKit (effectively stripping the "/"s). Then, we drop all components that match any of the appearance values we just stored above using Array's `drop(while:)` function
        let components = Path(name.lowercased())
            .components.drop(while: allValues.contains)
        return Path(components: components) + .colorset
    }
}

extension ColorSet.Color.Appearance.Value {
    /// For now, appearance values are unique to the modes they are associated with. This means we can determine an entire `ColorSet.Color.Appearance` from just a value like "high" (contrast appearance), "dark" (luminosity appearance), or "light" (also luminosity)
    var appearance: ColorSet.Color.Appearance? {
        let mode: ColorSet.Color.Appearance.Mode
        switch self {
        case .dark:
            mode = .luminosity
        case .high:
            mode = .contrast
        case .light:
            mode = .luminosity
        }

        return ColorSet.Color.Appearance(
            appearance: mode,
            value: self
        )
    }
}

// Test data that mimics the figma payload from a github action. We can't manually activate this script locally with the same context as a github action so we use this test data, instead.
let testData = "{\n  \"colors\": [\n    {\n      \"name\": \"Light/Background/Primary\",\n      \"value\": {\n        \"b\": 1,\n        \"g\": 1,\n        \"r\": 1\n      }\n    },\n    {\n      \"name\": \"Light/Accent/Primary\",\n      \"value\": {\n        \"b\": 0,\n        \"g\": 0,\n        \"r\": 0\n      }\n    },\n    {\n      \"name\": \"Light/Accent/Secondary\",\n      \"value\": {\n        \"b\": 1,\n        \"g\": 0.572549045085907,\n        \"r\": 0.462745100259781\n      }\n    },\n    {\n      \"name\": \"Light/Accent/Tertiary\",\n      \"value\": {\n        \"b\": 0.980392158031464,\n        \"g\": 0.823529422283173,\n        \"r\": 0.670588254928589\n      }\n    },\n    {\n      \"name\": \"Dark/Background/Primary\",\n      \"value\": {\n        \"b\": 0,\n        \"g\": 0,\n        \"r\": 0\n      }\n    },\n    {\n      \"name\": \"Dark/Accent/Primary\",\n      \"value\": {\n        \"b\": 0.980392158031464,\n        \"g\": 0.823529422283173,\n        \"r\": 0.670588254928589\n      }\n    },\n    {\n      \"name\": \"Dark/Accent/Secondary\",\n      \"value\": {\n        \"b\": 1,\n        \"g\": 0.572549045085907,\n        \"r\": 0.462745100259781\n      }\n    },\n    {\n      \"name\": \"Dark/Accent/Tertiary\",\n      \"value\": {\n        \"b\": 0.250980406999588,\n        \"g\": 0.0823529437184334,\n        \"r\": 0.0352941192686558\n      }\n    }\n  ]\n}"
