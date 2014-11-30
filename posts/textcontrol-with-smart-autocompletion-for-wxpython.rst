.. title: Textcontrol with smart autocompletion for wxpython
.. slug: textcontrol-with-smart-autocompletion-for-wxpython
.. date: 05/23/2012 05:09:24 PM UTC+05:30
.. tags: code
.. link: 
.. description: 
.. type: text

For my own use I needed a text entry widget in wxpython that allows smart autocompletion from a list of choices. By smart autocompletion, I mean choices should be displayed in a dropdown box and text entry should narrow down to matching choices. Match should be configurable to beginning only or anywhere within the string. Starting off from this_, I wrote my own textcontrol widget with autocomplete. A list of choices can be passed to the widget and matches can be configured. Check it out on github_. 

.. TEASER_END
   
.. image:: ../img/actextctrl_screenshot.png
   :width: 600 px
   :alt: Screenshot of the widget
   :align: left

.. _this: http://wiki.wxpython.org/TextCtrlAutoComplete
.. _github: https://github.com/RajaS/ACTextCtrl
