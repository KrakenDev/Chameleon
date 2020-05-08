import Foundation
import PathKit

/// Create the Figma Context instance
let figmaContext = Figma()

/// Generate empty xcassets, delete the existing `.xcassets folder`, and recreate the `.xcassets` folder we just created
var xcassets = XCAssets()
try? xcassets.path.delete()
try? xcassets.path.mkpath()

/// The root of every xcassets folder needs a stock Contents.json file so let's write one
xcassets.path.contentsJSON.write(Contents())

/// Convert all figma colors to `ColorSet`s and write that data to the correct Contents.json file!
figmaContext.colors.forEach { figmaColor in
    /// Compute the `.colorset` path for this figma color
    let colorsetPath = xcassets.path + figmaColor.colorsetPath
    /// Create the `.colorset` folder itself. This is where the Contents.json file goes. PathKit's `mkpath()` function also creates every intermediate folder too.
    try? colorsetPath.mkpath()

    /// Grab the existing `ColorSet` object at the `.colorset` path if it exists or create a new one. Then we can use the `Figma.colorset` computed property and append it to the `ColorSet`'s `colors` property.
    var colorset: ColorSet = colorsetPath.getContents() ?? .init(colors: [])
    colorset.colors.append(figmaColor.colorset)

    /// Write the completely converted data to the Contents.json file at the `.colorset` path we created above!
    colorsetPath.contentsJSON.write(colorset)
}

/**
 At this point, we've created all of the `.colorset` folders with the proper `ColorSet` data written to the Contents.json files contained within each one.

 However, we still need to supply a Contents.json file for every intermediate folder created by PathKit's `mkPath()` function.

 To do so, we can take advantage of the fact that PathKit's `Path` object can also be treated as a `Sequence` where iteration iterates recursively through each subfolder.

 So first, we filter out all recursive paths in our root `.xcassets` folder that are both a directory and doesn't contain an extension (this is because `.colorset`s are actually folders that have "colorset" as the extension). This filter should get us every intermediate folder created in our `forEach` loop.

 Once we have those, we can finally write the missing Contents.json files in each of those!

 The final piece is making sure the Contents.json in each of those intermediate folders are namespaced so that way we can access each individual color by their semantic name instead of accidentally generating duplicate colors.

 If we don't mark each of these intermediate folders as namespaced, then colors we generate like "background/primary" and "accent/primary" are considered duplicated since "background" and "accent" are intermediate folders generated by this script.
 */
xcassets.path
    .filter { $0.isDirectory && $0.extension == nil }
    .forEach { $0.contentsJSON.write(Contents(isNamespace: true)) }