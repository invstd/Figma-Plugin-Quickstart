# Publishing to npm

This guide shows how to publish `@inversestudio/create-figma-plugin-native` to npm.

## Prerequisites

1. **npm Account:** Ensure you're logged in to npm:
   ```bash
   npm login
   ```

2. **Organization Access:** Verify you have publish rights to `@inversestudio`:
   ```bash
   npm org ls inversestudio
   ```

3. **Package Name Available:** The package name is `@inversestudio/create-figma-plugin-native`

## Pre-Publish Checklist

- [ ] All tests pass (local CLI test successful ✅)
- [ ] Version number is correct in `package.json` (currently `1.0.0`)
- [ ] README.md is complete and accurate
- [ ] LICENSE file exists (MIT)
- [ ] `.gitignore` and `.npmignore` are properly configured
- [ ] Git repository is clean and committed
- [ ] All dependencies are correctly listed
- [ ] `bin` file is executable (`chmod +x bin/create-figma-plugin-native.js`)

## Publishing Steps

### 1. Verify Package Contents

```bash
npm pack --dry-run
```

This will show what files will be included in the package.

### 2. Test Installation Locally

```bash
npm link
cd /tmp
npm create @inversestudio/figma-plugin-native@latest test-project
```

### 3. Publish to npm

For first-time publishing:

```bash
npm publish --access public
```

For subsequent versions:

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major

# Then publish
npm publish
```

## Post-Publish Verification

1. **Check npm:** Visit https://www.npmjs.com/package/@inversestudio/create-figma-plugin-native

2. **Test installation:**
   ```bash
   npm create @inversestudio/figma-plugin-native@latest my-test-plugin
   cd my-test-plugin
   npm install
   npm run build
   ```

3. **Verify in Figma:** Import the plugin manifest and test in Figma

## Quick Publish (All-in-One)

```bash
cd /Users/mschultz/create-figma-plugin-native

# Verify everything
npm pack --dry-run

# Publish
npm publish --access public

# Tag version in git
git tag v1.0.0
git push origin main --tags
```

## Usage After Publishing

Users can then create projects with:

```bash
npm create @inversestudio/figma-plugin-native@latest my-plugin
```

Or:

```bash
npx @inversestudio/create-figma-plugin-native my-plugin
```

## Troubleshooting

**"Package name already exists":**
- The name is unique, so this shouldn't happen
- If it does, choose a different name in `package.json`

**"No permission to publish":**
- Ensure you're logged in: `npm whoami`
- Verify org membership: `npm org ls inversestudio`

**"Files not included":**
- Check `files` array in `package.json`
- Files listed there will be included in the package

## Current Package Info

- **Name:** `@inversestudio/create-figma-plugin-native`
- **Version:** `1.0.0`
- **Registry:** npm public registry
- **Organization:** `@inversestudio`
- **License:** MIT

## Next Steps

After successful publish:
1. Update the main documentation repo (`Figma Plugin Documentation`) with a link to the npm package
2. Create a GitHub release with release notes
3. Share on social media / Figma community
