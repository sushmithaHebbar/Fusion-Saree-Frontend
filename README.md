Saree Fusion Design Studio

Overview

The Saree Fusion Design Studio is a responsive web application built with React that showcases a modern, vibrant user interface focused on custom Indian saree design concepts. The application features a dynamic, mobile-first design with an emphasis on rich visuals and real-time theme switching.

Key Features

Dynamic Theme Switching: Users can toggle between Light Mode (default) and Dark Mode using the moon/sun icon in the header. The primary color palette (Orange, Red, Gold) dynamically adjusts for high contrast in both modes.

Custom 3D Carousel: A pure React/CSS implementation of a 3D, center-active carousel that automatically advances and loops through design examples with smooth visual transitions.

Hero Section: A dedicated, full-width section with a strong visual and call-to-action (CTA).

Design Workflow: Dedicated views (UploadView and ResultView) simulate the process of uploading design elements (Body, Pallu, Border) and generating fused design results.

Themed Footer: A streamlined, responsive footer containing key links and a prominent CTA, fully integrated with the application's color theme.

Technical Details

This application is implemented entirely within a single React component file (App.jsx) using functional components and hooks (useState, useEffect, useCallback, useRef).

Technology

Implementation Detail

Framework

React (Functional Components & Hooks)

Styling

Custom CSS (using the style jsx approach) and Bootstrap utility classes.

Theming

Implemented using CSS variables (:root and .dark-mode classes) for instant, site-wide color changes.

Carousel

Pure JavaScript/React logic for 3D scaling and center alignment (mimics libraries like Owl Carousel without external dependencies).

Design Palette

Uses a warm Orange, Red, and Gold color scheme, dynamically managed by CSS variables.

Application Structure

The core application logic is contained in the App component, which manages the current page state (home, upload, loading, result) and the user's theme preference.

Header: Contains branding, navigation links, and the theme toggle control.

HomeView: Displays the HeroSection, CustomCarousel, and the Design Components cards/CTA.

CustomCarousel: The component responsible for the visual and functional 3D rotating display.

UploadView: The simulated design interface.

ResultView: Displays the mock AI-generated image.

Footer: Provides secondary navigation and calls-to-action.
