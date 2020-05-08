import Foundation

struct CustomKey: CodingKey, Codable {
    var intValue: Int?
    var stringValue: String
    var error: String?

    static var error: CodingKey {
        CodingKeys.error
    }

    init?(stringValue: String) {
        self.stringValue = stringValue
        self.intValue = nil
    }

    init?(intValue: Int) {
        self.stringValue = "\(intValue)"
        self.intValue = intValue
    }
}

func customDecode(codingKeys: [CodingKey]) -> CodingKey {
    CustomKey(stringValue: codingKeys
        .last?
        .stringValue
        .camelCases
        .joined() ?? ""
    ) ?? CustomKey.error
}

func customEncode(codingKeys: [CodingKey]) -> CodingKey {
    CustomKey(stringValue: codingKeys.last?
        .stringValue
        .camelCases
        .joined(separator: "-")
        .lowercased() ?? ""
    ) ?? CustomKey.error
}
