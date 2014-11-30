.. title: Linux on Thinkpad x220
.. slug: linux-on-thinkpad-x220
.. date: 05/18/2012 05:02:36 PM UTC+05:30
.. tags: tech
.. link: 
.. description: 
.. type: text

I bought a Lenovo Thinkpad X 220 recently. This is my third thinkpad, the previous ones being an X40 (stolen) and an X61s (showing signs of wear and tear after 4 years of heavy use). Overall, there is nothing to disappoint a thinkpad fan with the fantastic keyboard and solid build as expected. The differences are a wider screen (mixed feeling about this, the width makes it easier to code with a split screen, but the loss of height needs some getting used to), a trackpad (which I don't use much) and some additional media buttons (again, not important for me). The screen is thinner and lighter and along with an SSD makes the system lighter.

.. TEASER_END

The system came with Windows 7 preinstalled (there is no option to avoid the "Windows tax"). The last thinkpad I got, I had no second thoughts about removing Windows Vista and installing Linux. This time, however, I decided to try and retain Windows 7. I did not want to dual boot since I use Windows rarely. For virtualization, the options were to retain windows on the disk and use it in 'raw' mode or to convert the physical windows partitions into a virtual disk. For the latter there seemed to be two solutions, VMware's converter_ and Microsoft's disk2vhd_.
disk2vhd was straightforward to use, working from within the running system itself. I selected all 3 partitions to make the virtual disk. This booted up fine in Virtualbox once virtualisation was enabled in the bios and the option 'IO APIC' was enabled in virtualbox.
I copied out the virtual hard disk and erased all the partitions before installing Ubuntu 12.04. As I have come to expect, the install was smooth and everything worked perfectly. With the SSD, booting up and resume from suspend are very fast and the system is very responsive and running cooler than my old one. 


.. _converter: http://www.vmware.com/products/converter/
.. _disk2vhd: http://technet.microsoft.com/en-us/sysinternals/ee656415.aspx
