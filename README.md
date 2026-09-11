# Camp Match --- Frontend

> A modern student-housing marketplace designed to help students
> discover verified accommodation, connect with trusted House Scouts,
> and eventually complete secure bookings and transactions.

## Overview

Camp Match is a student-focused housing platform built around **trust,
convenience, and proximity to campus**.

The frontend supports the marketplace experience for discovering
accommodation, searching and filtering properties, viewing property
details, saving listings, and preparing for future booking, payment,
verification, messaging, and trust-and-safety capabilities.

The project follows a **frontend-first, API-ready architecture**. Mock
data is currently used so the frontend can be developed independently of
the eventual Python/FastAPI REST API.

The key architectural principle is:

> **The UI should not need to change when the data source changes.**

------------------------------------------------------------------------

## Current Status

  -----------------------------------------------------------------------
  Phase                   Description             Status
  ----------------------- ----------------------- -----------------------
  Phase 1                 Design System &         ✅ Completed
                          Marketplace Foundation  

  Phase 2                 Authentication &        ✅ Completed
                          Three-Role Onboarding   

  Phase 3                 Property Owner & House  🚧 In Progress
                          Scout Property          
                          Management              

  Phase 4                 Roommate Matching       Planned

  Phase 5                 Booking &               Planned
                          Escrow/Payments         

  Phase 6                 Messaging &             Planned
                          Notifications           

  Phase 7                 Verification & Trust &  Planned
                          Safety                  

  Phase 8                 Dashboard Refinement    Planned

  Phase 9                 Administration          Planned

  Phase 10                Backend Integration &   Planned
                          Testing                 
  -----------------------------------------------------------------------

Development should proceed one phase at a time. Features belonging to
later phases should not be implemented prematurely.

------------------------------------------------------------------------

# Product Roles

Camp Match has three distinct primary roles.

## Student

Students can:

-   Discover accommodation
-   Search by university, area, or property
-   Filter listings
-   View property details
-   Save properties
-   Contact trusted House Scouts
-   Eventually request bookings and complete secure transactions
-   Eventually participate in roommate matching

## Property Owner

Property Owners are the actual owners of properties listed on Camp
Match.

They will be able to:

-   Create properties
-   Manage their properties
-   Edit property information
-   Manage photos
-   Manage availability
-   View verification status
-   Monitor property activity
-   Authorize and manage House Scouts

## House Scout

House Scouts represent or manage properties on behalf of Property
Owners.

They may:

-   View properties they are authorized to manage
-   Manage permitted property information
-   Manage availability where authorized
-   Monitor relevant activity
-   Help students discover suitable properties

**A House Scout is not automatically the owner of a property.**

The distinction must always remain clear:

> **Property Owner = owns the property**\
> **House Scout = represents/manages an authorized property**

------------------------------------------------------------------------

# Product Experience

The primary student journey is:

``` text
Landing
   ↓
Register / Login
   ↓
Onboarding
   ↓
Home
   ↓
Discover
   ↓
Search / Filter
   ↓
Property Details
   ↓
Save / Contact Scout
   ↓
Booking
   ↓
Payment
   ↓
Confirmation
```

Frontend navigation should be based on **user experience and product
roles**, not backend module names.

------------------------------------------------------------------------

# Design Philosophy

Camp Match should feel like:

> **Airbnb × modern fintech × student lifestyle platform**

adapted specifically for students in Nigeria.

The product should feel:

-   Modern
-   Trustworthy
-   Premium
-   Youthful
-   Clean
-   Simple
-   Safe
-   Mobile-first

The core product feeling is:

> **"I can trust this platform to help me find a place near my
> school."**

Avoid the visual language of traditional, cluttered real-estate
websites.

Avoid:

-   Excessive gradients
-   Excessive glassmorphism
-   Overly corporate dashboards
-   Unnecessary visual clutter
-   Excessive colors
-   Unnecessary animation

------------------------------------------------------------------------

# UI Preservation Rule

The existing Camp Match interface is **approved product design**.

When extending the application:

-   Do not redesign completed screens unnecessarily.
-   Do not replace the existing design system.
-   Do not introduce an unrelated visual language.
-   Reuse existing components wherever possible.
-   Make new components feel native to Camp Match.
-   Preserve existing navigation, cards, buttons, badges, typography,
    spacing, colors, and responsive behavior.
-   Do not modify completed functionality unless the current feature
    genuinely requires it.

### Core principle

> **Same Camp Match. More capability.**

------------------------------------------------------------------------

# Visual System

## Color Direction

### Primary

Deep green / emerald tones representing trust, growth, safety, and
stability.

### Background

Warm off-white and very light neutral surfaces.

### Text

Dark charcoal rather than pure black.

### Accent

A restrained warm gold/orange accent for important highlights.

### Supporting Colors

Use restrained success green, warning amber, error red, and neutral
gray.

The interface should remain visually calm.

## Typography

Use a modern, highly readable sans-serif font.

**Inter** is preferred where available.

Typography should provide a clear hierarchy:

-   Large page headings
-   Medium section headings
-   Comfortable body text
-   Small metadata
-   Strong price typography

------------------------------------------------------------------------

# Responsive Design

Camp Match is **mobile-first** because students are expected to use the
platform primarily from smartphones.

Support:

-   Small mobile
-   Large mobile
-   Tablet
-   Desktop
-   Large desktop

Do not simply shrink the desktop interface for mobile.

Mobile layouts should be intentionally designed around:

-   Thumb-friendly controls
-   Large touch targets
-   Bottom navigation
-   Horizontal scrolling where appropriate
-   Bottom sheets for filters
-   Sticky actions when useful
-   Readable typography
-   Optimized images

------------------------------------------------------------------------

# Navigation

## Mobile

Primary navigation:

-   Home
-   Discover
-   Saved
-   Messages
-   Profile

The active navigation item should always be visually clear.

## Desktop

Use a clean application shell with a compact sidebar/navigation area and
a main content area.

The navigation should not consume unnecessary screen space.

------------------------------------------------------------------------

# Architecture

Camp Match uses a **frontend-first, API-ready architecture**.

The current frontend uses mock data and is designed to later consume a
Python/FastAPI REST API.

The intended flow is:

``` text
UI Component
      ↓
Feature Hook / Service
      ↓
Data Provider
      ↓
Mock Data
```

Later:

``` text
UI Component
      ↓
Feature Hook / Service
      ↓
API Service
      ↓
API Client
      ↓
FastAPI
```

UI components should not depend directly on the data source.

------------------------------------------------------------------------

# Data Architecture

Dynamic content must not be hard-coded inside visual components.

Examples:

-   Properties
-   Users
-   Scouts
-   Bookings
-   Messages
-   Notifications
-   Universities
-   Verification information
-   Payments

Prefer:

``` tsx
<PropertyCard listing={listing} />
```

over hard-coding property information inside the component.

Mock data should be separated from application logic and structured
similarly to realistic API responses.

------------------------------------------------------------------------

# Service / Data Access Layer

Features should access data through reusable services or hooks.

Examples:

``` text
getListings()
getListingById(id)
searchListings(params)
getSavedListings()
```

Later, these services can call API endpoints such as:

``` text
GET /api/v1/listings
GET /api/v1/listings/:id
```

without requiring visual components to change.

**Do not invent undocumented endpoints.**

------------------------------------------------------------------------

# API Boundary

The eventual backend will be a **Python/FastAPI REST API** returning
JSON.

The frontend should depend only on documented API contracts and
API-facing data representations.

The frontend should not depend on:

-   Database schemas
-   Database tables
-   Repository implementations
-   Internal Python classes
-   Internal backend services
-   Storage-provider implementation
-   Undocumented response fields

The backend remains authoritative for business rules and permissions.

------------------------------------------------------------------------

# API Client

The API client should eventually handle:

-   Base URL configuration
-   HTTP requests
-   Authentication headers
-   JSON serialization
-   Error normalization
-   Request cancellation
-   API versioning

Avoid placing raw `fetch()` calls directly inside visual components.

------------------------------------------------------------------------

# Environment Configuration

Do not hard-code API URLs.

Prepare separate configurations for:

-   Development
-   Staging
-   Production

For a Vite-based project, an environment variable such as:

``` text
VITE_API_BASE_URL
```

may be used for the API base URL.

**Never expose secrets in frontend environment variables.**

------------------------------------------------------------------------

# Type Safety

Create reusable TypeScript types/interfaces for API-facing frontend
data.

Expected domain types include:

-   Listing
-   User
-   Scout
-   Booking
-   Message
-   Notification
-   University
-   Verification
-   Payment

Frontend types should represent the API-facing data model rather than
internal database schemas.

------------------------------------------------------------------------

# Component Architecture

Prefer reusable components over duplicated markup.

## Shared UI primitives

``` text
Button
Input
Select
Textarea
SearchInput
Modal
Drawer
Dropdown
Tabs
Badge
Avatar
Toast
Skeleton
EmptyState
ErrorState
LoadingState
Pagination
```

## Camp Match components

``` text
PropertyCard
PropertyGrid
PropertyGallery
PropertyFeatures
PropertyLocation
VerificationBadge
ScoutCard
BookingCard
BookingStatus
MessagePreview
NotificationItem
```

Search for and reuse existing components before creating duplicates.

Avoid giant components containing unrelated functionality.

------------------------------------------------------------------------

# Property Card

`PropertyCard` is a core Camp Match component.

It should support:

-   Property image
-   Favorite action
-   Property title
-   Price
-   Price period
-   Location
-   Distance from university
-   Accommodation type
-   Verification badge
-   Scout information where appropriate

The same component should work across the marketplace.

------------------------------------------------------------------------

# Student Experience

## Home

The Home experience should remain student-focused.

Typical content:

``` text
Good morning 👋

Find your next home.

[ Search by university, area or property ]

Recommended for you
Near your campus
Recently added
```

Avoid overwhelming the student with excessive information.

## Discover

Discover is the core marketplace experience.

Support:

-   Search
-   Filters
-   Sorting
-   Responsive property grids

Filters include:

-   University
-   Location
-   Price range
-   Accommodation type
-   Distance
-   Verified listings

Recommended grid behavior:

``` text
Mobile   → 1 column
Tablet   → 2 columns
Desktop  → 3–4 columns depending on width
```

## Property Details

Property details should feel premium and trustworthy.

Typical structure:

``` text
Back
↓
Image Gallery
↓
Property Title
Price
Location
Verification
Description
Features
Location / Map
Scout Information
Availability
Booking CTA
```

On mobile, a sticky bottom booking action may be used.

On desktop, a sticky booking card may be used on the right side.

------------------------------------------------------------------------

# Trust & Verification

Verification is a major Camp Match differentiator.

Use reusable components such as:

``` text
VerificationBadge
VerificationCard
VerificationStatus
```

Verification should communicate meaningful information, such as:

-   Identity verified
-   Property information reviewed
-   Scout verified

Verification should feel trustworthy without overwhelming the user.

------------------------------------------------------------------------

# State Management

Every API-driven feature should intentionally support:

-   Loading
-   Success
-   Empty
-   Error
-   Relevant transitional states

Examples:

``` text
Payment processing
Verification pending
Booking pending
Booking confirmed
Booking cancelled
```

Use skeleton loaders and reusable state components rather than blank
screens.

------------------------------------------------------------------------

# Accessibility

Accessibility is part of the product quality standard.

Provide:

-   Semantic HTML
-   Keyboard navigation
-   Proper form labels
-   Accessible buttons
-   Visible focus states
-   Appropriate contrast
-   Meaningful alt text
-   Screen-reader-friendly state changes
-   Accessible dialogs and interactive controls

------------------------------------------------------------------------

# Animation

Animations should be subtle and purposeful.

Appropriate examples:

-   Card hover
-   Button feedback
-   Page transitions
-   Modal transitions
-   Skeleton loading
-   Favorite interactions
-   Navigation transitions

Avoid excessive animation.

------------------------------------------------------------------------

# Mock Data

Mock data should be realistic and representative of the Nigerian
student-housing market.

Use realistic examples for:

-   Property names
-   Nigerian locations
-   Naira pricing
-   Universities
-   Areas
-   Campus distances
-   Scout profiles
-   Property images

Keep mock data clearly separated from application logic so it can later
be replaced by API responses.

------------------------------------------------------------------------

# Phase 3 --- Property Management

**Current phase: In Progress**

Phase 3 introduces property-management capabilities for Property Owners
and House Scouts.

## Property Owner

The Owner experience includes:

-   Owner dashboard
-   My properties
-   Add property
-   Edit property
-   Photo management
-   Availability management
-   Verification status
-   Property activity
-   Authorized Scout management

## House Scout

The Scout experience includes:

-   Scout dashboard
-   Managed properties
-   Owner relationship visibility
-   Permitted property-management actions
-   Availability management where authorized
-   Activity

Owner and Scout experiences must remain clearly differentiated.

------------------------------------------------------------------------

# Phase 3 Property Creation

The property creation experience should use a multi-step flow.

### Step 1 --- Basic Information

-   Property title
-   Accommodation type
-   Description

### Step 2 --- Location

-   University
-   Area
-   Address
-   Location/map representation

### Step 3 --- Pricing & Availability

-   Rent
-   Payment frequency
-   Availability date

### Step 4 --- Features & Amenities

Examples:

-   Bedrooms
-   Bathrooms
-   Water
-   Electricity
-   Prepaid meter
-   Parking
-   Security
-   Internet
-   Kitchen
-   Furnished

### Step 5 --- Photos

Support:

-   Image selection
-   Preview
-   Upload progress
-   Remove
-   Reorder
-   Primary image
-   Upload errors
-   Empty state

### Step 6 --- Review

Show a clear summary before submission and allow individual sections to
be edited.

------------------------------------------------------------------------

# Property Status

Property status is backend-authoritative.

Possible states:

``` text
Draft
Pending review
Active
Unavailable
Changes requested
Rejected
Suspended
```

A newly submitted property must **not** automatically be presented as
verified.

Conceptual flow:

``` text
Draft
  ↓
Submitted
  ↓
Pending verification/review
  ↓
Backend decision
  ↓
Active / Changes requested / Rejected
```

------------------------------------------------------------------------

# Property Photos & Future Image Review

Camp Match may eventually use backend/image-analysis systems to review
property images.

Phase 3 should prepare the UI for states such as:

``` text
Accepted
Pending review
Review required
Rejected
```

The frontend should **not** attempt to determine whether an image was
AI-generated. That decision belongs to the backend or dedicated
verification service.

------------------------------------------------------------------------

# Owner ↔ Scout Management

Property Owners should be able to:

-   View authorized Scouts
-   Search Scouts where appropriate
-   Authorize a Scout
-   Remove a Scout
-   See which properties a Scout manages

Authorization and permissions must ultimately be enforced by the
backend.

Frontend controls are not a security boundary.

------------------------------------------------------------------------

# Permissions

The frontend may hide or disable unavailable actions and explain
permission states.

However, the backend is authoritative.

Treat these as distinct states:

``` text
401 Unauthorized
403 Forbidden
```

------------------------------------------------------------------------

# Error Handling

Normalize API errors centrally.

Common categories:

``` text
VALIDATION_ERROR
UNAUTHORIZED
FORBIDDEN
NOT_FOUND
CONFLICT
RATE_LIMITED
SERVER_ERROR
NETWORK_ERROR
```

Avoid inconsistent error handling across individual components.

------------------------------------------------------------------------

# Security Principles

Do not:

-   Store secrets in frontend code
-   Hard-code credentials
-   Treat hidden UI elements as authorization
-   Access databases directly
-   Depend on internal backend implementation details

Sensitive authorization and business rules must ultimately be enforced
by the backend.

------------------------------------------------------------------------

# Phase 3 Development Sequence

Implement Phase 3 incrementally:

``` text
1. Inspect existing architecture
2. Owner Dashboard
3. My Properties
4. Add Property Wizard
5. Property Management / Edit
6. Photo Management
7. Availability
8. Verification Status
9. Owner ↔ Scout Management
10. Scout Dashboard
11. Scout Property Management
12. Responsive refinement
13. Loading / Error / Empty states
14. Accessibility review
15. Code cleanup and component reuse review
```

After each major milestone:

1.  Test existing functionality.
2.  Verify Phase 1 and Phase 2 have not regressed.
3.  Check mobile and desktop behavior.
4.  Review the Git diff.
5.  Fix regressions.
6.  Commit the stable state.

------------------------------------------------------------------------

# Git Workflow

GitHub is the project's source of truth.

Before major changes, create a checkpoint:

``` bash
git add .
git commit -m "Camp Match - Phase 2 complete UI checkpoint"
git push
```

After each major Phase 3 milestone, create another meaningful commit.

This makes unwanted changes recoverable.

------------------------------------------------------------------------

# Development Principles

### Preserve before replacing

Extend an existing component when it can safely support the new feature.

### Reuse before duplicating

Search the codebase before creating new components.

### API contract before assumptions

Do not invent backend behavior when the contract is undefined.

### Backend authority

Business rules, permissions, verification, and payment states must
ultimately be authoritative on the backend.

### Small changes before large rewrites

Implement features incrementally and review changes before continuing.

### UX before feature count

A smaller number of polished experiences is better than many unfinished
screens.

### Consistency before novelty

New interfaces should feel like they were always part of Camp Match.

------------------------------------------------------------------------

# Planned Roadmap

## Phase 1 --- Design System & Marketplace Foundation

**Completed**

Design system, application shell, Home, Discover, property cards,
property details, and responsive foundation.

## Phase 2 --- Authentication & Onboarding

**Completed**

Login, registration, verification flow, role selection, and Student,
Property Owner, and House Scout onboarding.

## Phase 3 --- Property Management

**In Progress**

Owner dashboard, property creation and management, photos, availability,
verification status, Owner/Scout management, and Scout property
management.

## Phase 4 --- Roommate Matching

**Planned**

Roommate preferences, compatibility signals, matching experience, match
results, and live-alone preference handling.

## Phase 5 --- Booking & Escrow/Payments

**Planned**

Booking requests, booking states, payment initiation, escrow flow,
transaction status, and payment confirmation.

## Phase 6 --- Messaging & Notifications

**Planned**

Conversations, messaging, notifications, read/unread states, and
relevant property/booking alerts.

## Phase 7 --- Verification & Trust & Safety

**Planned**

Identity verification, property verification, Scout verification,
reporting, trust indicators, and safety workflows.

## Phase 8 --- Dashboard Refinement

**Planned**

Student, Owner, and Scout dashboard refinement, activity, statistics,
saved properties, bookings, and matches.

## Phase 9 --- Administration

**Planned**

Admin dashboard, user management, property moderation, verification
review, reports/disputes, and platform controls.

## Phase 10 --- Backend Integration & Testing

**Planned**

FastAPI integration, mock-to-real API transition, API contract
validation, authentication/session testing, payment testing, error
handling, security review, performance optimization, and end-to-end
testing.

------------------------------------------------------------------------

# Local Development

## Prerequisites

-   Node.js
-   npm
-   Git

## Clone the repository

``` bash
git clone <repository-url>
cd <repository-name>
```

## Install dependencies

``` bash
npm install
```

## Start the development server

``` bash
npm run dev
```

Follow the local URL displayed by the development server.

------------------------------------------------------------------------

# Project Structure

The exact structure should follow the existing codebase. A preferred
feature-oriented structure is:

``` text
src/
├── api/
│   └── client/
├── features/
│   ├── auth/
│   ├── student/
│   ├── properties/
│   ├── owner/
│   └── scout/
├── components/
├── data/
│   └── mock/
├── hooks/
├── types/
├── utilities/
└── ...
```

Do not rewrite the existing structure unnecessarily.

------------------------------------------------------------------------

# Long-Term Architecture

``` text
                CAMP MATCH FRONTEND
                         │
                         ▼
                 Feature Components
                         │
                         ▼
                  Hooks / Services
                         │
                         ▼
                    API Client
                         │
                         ▼
                 FastAPI REST API
                         │
                         ▼
               Backend Domain Layer
```

The frontend remains independent of internal backend implementation
details, allowing frontend and backend development to proceed in
parallel.

------------------------------------------------------------------------

# Quality Standard

Camp Match should feel like a real production product, not an
AI-generated template.

Priorities:

``` text
Excellent UX
     >
Reusable architecture
     >
Responsive design
     >
API-ready data architecture
     >
Trust and clarity
     >
Feature count
```

The objective is not simply to create more screens.

The objective is to create a **coherent, trustworthy, maintainable
student-housing platform**.

------------------------------------------------------------------------

# Core Product Principle

> **Student --- Find a home.**\
> **Property Owner --- Own, list, verify, and manage a property.**\
> **House Scout --- Represent and manage authorized properties.**

**One platform. Three distinct roles. One consistent Camp Match
experience.**

------------------------------------------------------------------------

## Project Status

Camp Match is actively under development with a strong emphasis on:

-   Product quality
-   UI consistency
-   Maintainable architecture
-   API readiness
-   Responsive design
-   Accessibility
-   Trust and safety
