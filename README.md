<p align="center">
    <img alt="rootPath" src="./local-rootPath.png">
</p>

# rootPath

rootPath is an extension to [localWP](https://localwp.com/), which allows you to manually set the root path of your WordPress instance. This extension is specifically designed for NGINX configuration and has not been tested with Apache. Setting the root path in localWP is useful for installing WordPress frameworks such as [Bedrock](https://roots.io/bedrock/) by [roots.io](https://roots.io/) and similar frameworks. Additionally, it can be handy for quickly mapping between projects or even custom frameworks outside of WordPress or PHP.

## How to Install and Use

1. Download a copy of the extension from the rootPath GitHub repository by clicking on the **Code** button and selecting **Download ZIP**.

2. Open your localWP application and navigate to the **Add-ons** menu. Then, go to the **Installed** tab.

3. Click on **Install from Disk** and select the downloaded ZIP file.

4. Once installed, make sure to enable the rootPath extension. It may prompt you to reload localWP.

5. After installation, go to the **Local Sites** tab on the left-hand side and click on the instance you want to edit.

6. In the overview screen, you will find an input field that allows you to change the root path.

7. By default, all localWP installs are set to the `public` folder. For Bedrock installs, it is required to set it to `public/web/`.

8. Once you have set the root path, click **Apply**.

9. After applying the changes, you will need to manually restart the local server. Right-click on your WordPress install in the left-hand sites list and select **Restart**.

10. Your WordPress install should now be mapped to the root path you have set.

> **Note:** This extension does not fix the issue with localWP not being able to detect your `wp-config.php` file to display database information, WordPress version, or enable one-click admin login. These features are hardcoded within localWP to be within the root folder specified during the initial setup. Hopefully, with time, full support for Bedrock and sites outside of WordPress will be implemented in localWP.

## Acknowledgements

This project was made possible thanks to the following resources:

- [localwp-projectbase-addon GitHub repository](https://github.com/DekodeInteraktiv/localwp-projectbase-addon)
- [Support Bedrock in localWP](https://community.localwp.com/t/support-bedrock-in-local/35840) discussion on the localWP community forum

## License

This project is open-source and free to use. Happy developing!
