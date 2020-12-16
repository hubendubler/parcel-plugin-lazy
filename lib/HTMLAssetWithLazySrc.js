const HTMLAsset = require('parcel-bundler/src/assets/HTMLAsset');

class HTMLAssetWithLazySrc extends HTMLAsset {
    collectDependencies() {
        super.collectDependencies();
        this.ast.walk(node => {
            const attrs = [
                'data-src',
                'data-srcset',
                'data-image-src'
            ];
            if (node.attrs) {
                for (let attr in node.attrs) {
                    if (attrs.includes(attr)) {
                        node.attrs[attr] = super.collectSrcSetDependencies(node.attrs[attr]);
                        this.isAstDirty = true;
                        continue;
                    }
                }
            }

            return node;
        });
    }
}

module.exports = HTMLAssetWithLazySrc;