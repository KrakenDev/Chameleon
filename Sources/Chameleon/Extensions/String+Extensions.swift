import Foundation

extension String {
    var camelCases: [String] {
        var cases: [String] = [""]
        var shouldUppercase = false
        for character in self {
            if character.isPunctuation {
                shouldUppercase = true
                continue
            }

            if character.isUppercase || shouldUppercase {
                cases.append(shouldUppercase ?
                    character.uppercased() : String(character)
                )
            } else {
                var currentCase = cases.removeLast()
                currentCase = currentCase + String(character)
                cases.append(currentCase)
            }
            shouldUppercase = false
        }
        return cases.filter { !$0.isEmpty }
    }
}
