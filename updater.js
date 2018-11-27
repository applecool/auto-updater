// Modules
const { dialog, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater')

// // Enable logging
autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

// Disable auto downloading
autoUpdater.autoDownload = false

// Check for updates
exports.check = () => {

    // Start update check
    autoUpdater.checkForUpdates()
    
    // Listen for download (update) found
    autoUpdater.on('update-available', () => {

        // Track progress percent
        // let downloadProgress = 0

        // Prompt user to update
        dialog.showMessageBox({
            type: 'info',
            title: 'Update Available',
            message: 'A new version of Hello Electron is available. Do you want to update now?',
            buttons: ['Update', 'No']
        }, (buttonIndex) => {

            // If not 'Update' button, return
            if (buttonIndex !== 0) return

            // Else start download and show download progress in new window
            autoUpdater.downloadUpdate()

            // Track download progress on autoUpdater
            // autoUpdater.on('download-progress', (d) => {
            //     downloadProgress = d.percent
            // })

            // Listen for completed update download
            autoUpdater.on('update-downloaded', () => {

                // Prompt user to quit and install update
                dialog.showMessageBox({
                    type: 'info',
                    title: 'Update Ready',
                    message: 'A new version of Hello Electron is ready. Quit and install now?',
                    buttons: ['Yes', 'Later']
                }, (buttonIndex) => {

                    // Update if 'Yes'
                    if (buttonIndex === 0) autoUpdater.quitAndInstall()
                })
            })
        })
    })
}
