.. title: Install Mendeley plugin for Libreoffice
.. slug: install-mendeley-plugin-for-libreoffice
.. date: 05/25/2012 05:39:28 PM UTC+05:30
.. tags: tech
.. link: 
.. description: 
.. type: text

OK, I struggled with this for half an hour, so just to document the solution. On my new laptop with Ubuntu 12.04 and Libreoffice 3.5, I installed Mendeley_ with the deb package from the website. Installation went well, but when trying to install the openoffice plugin, it first complained it could not find unopkg. After some time I found that this was now located at /usr/lib/libreoffice/program/. So I pointed Mendeleydesktop towards this and now it ended with a warning that 'Couldn't Install OpenOffice Plugin The OpenOffice unopkg utility gave the following output:'. I read about manually installing the oxt which is at '/opt/mendeleydesktop/share/mendeleydesktop/openOfficePlugin/Mendeley-1.5.2.oxt' and opened the extension manager at libreoffice when I found that the Mendeley plugin is already installed. So, all I had to was restart Libreoffice and the Mendeley toolbar was now available.

.. _Mendeley: http://www.mendeley.com/
