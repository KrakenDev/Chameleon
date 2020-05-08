import Foundation

extension Array {
    func map<T>(to keyPath: KeyPath<Element, T>) -> [T] {
        map { element in
            element[keyPath: keyPath]
        }
    }
    func compactMap<T>(to keyPath: KeyPath<Element, T?>) -> [T] {
        compactMap { element in
            element[keyPath: keyPath]
        }
    }
}
