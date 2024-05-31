# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

- `[Unreleased]` for upcoming features.
- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities

## [2.0.0] - 2024.05.30

### Added

- Added `removeExisting` property on the toast config object to remove any existing toasts in the container
- Added web components for icons, alerts, badges and toasts

### Changed

- Updated documentation
- Updated dependencies

## [1.2.1] - 2023.08.02

### Fixed

- Fixed `data-hide` bug in `app.js`

## [1.2.0] - 2023.07.28

### Added

- Added the `.tu-border-radius-sm` class based on the `skin.borderRadiusSm` config value
- Added the `tabs.updateHash` member to the `Skin.App.init` config object

## [1.1.0] - 2023.07.24

### Added

- Added `getMinimumBorderRadius` function in `index.js` and applied to `.tc-form-checkbox`
- Added `.tc-btn-sm` component

### Changed

- `tc-btn-row` bugfix
- Dark mode flicker bugfix

## [1.0.0] - 2023.04.06

### Changed

- Updated documentation

## [0.3.0] - 2023.03.31

### Changed

- Updated styling of come utility classes.
- Updated documentation relating to the `tailwind.config.js` file.
- Updated dashboard and login templates.

### Fixed

- Fixed bug in example form POST URL.

## [0.2.0] - 2023.03.30

### Added

- Added `Skin.Form.getPromise()` function.
- Added form example.
- Added `tu-ring-*` utility classes.
- Added a focus trap to the modal element when shown.

### Changed

- Updated to support Tailwind CSS v3.3.
- Updated documentation.
- Updated vendor dependencies.

### Fixed

- Fixed some CSS bugs.
- Fixed JavaScript bug in modal not allowing any keydown events.

## [0.1.0] - 2023.03.27

### Added

- Initial release.