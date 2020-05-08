import Foundation
import PathKit

extension Path {
    enum Extension: String {
        case xcassets, json, colorset
    }

    var contentsJSON: Path {
        self + "Contents" + .json
    }

    func getContents<T: Codable>() -> T? {
        let decoder = JSONDecoder()
        decoder.keyDecodingStrategy = .custom(customDecode)
        if let data = try? contentsJSON.read() {
            return try? decoder.decode(T.self, from: data)
        }
        return nil
    }

    func write<T: Codable>(_ codable: T) {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
        encoder.keyEncodingStrategy = .custom(customEncode)
        try! write(try! encoder.encode(codable))
    }

    static func +(lhs: Path, rhs: Path.Extension) -> Path {
        lhs.string + rhs
    }
}

extension String {
    static func +(lhs: String, rhs: Path.Extension) -> Path {
        Path("\(lhs).\(rhs.rawValue)")
    }
}
