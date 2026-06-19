# Issue: VideoDemo Progress Bar Alignment and Scaling

## Problem Statement

The progress bar dots in the VideoDemo section are not perfectly center-aligned with the section headings on their right. Additionally, the progress bar needs to be scaled section-wise to the exact duration of each section.

## Current Issues

### 1. Dot Alignment
- The dots are positioned using timestamp proportions (`top: (timestamp / duration) * 100%`)
- This doesn't account for the actual visual centering of tab titles
- When tabs have different content heights or padding, the dots don't align with the visual center of the tab titles

### 2. Progress Bar Scaling
- The progress bar segments should be scaled based on the actual duration of each section
- Currently, dots are positioned by timestamp proportion, but the visual spacing between dots doesn't reflect the actual time duration between chapters
- The bar should show proportional spacing based on section durations, not just timestamp positions

## Requirements

### 1. Perfect Vertical Centering
- Dots must be vertically centered with the tab titles regardless of:
  - Tab content height variations
  - Different padding/margins
  - Responsive layouts
  - Future changes to chapter data

### 2. Dynamic Section Scaling
- The progress bar segments between dots must be proportional to the actual duration of each section
- Section duration = time from current chapter timestamp to next chapter timestamp
- First section: from chapter timestamp to next chapter timestamp
- Last section: from chapter timestamp to end of video

### 3. Future-Proof Design
- Must work with any video configuration:
  - Different number of chapters
  - Different timestamps
  - Different section durations
  - Different chapter titles and descriptions
- No hardcoded values or assumptions about specific video content
- Must adapt automatically when video or chapter data changes

## Technical Implementation Plan

### 1. Measure Tab Positions
- Use `useRef` to get references to each tab element
- Use `getBoundingClientRect()` to measure the vertical center of each tab
- Calculate the percentage position relative to the progress bar height

### 2. Calculate Section Durations
- For each chapter, calculate the duration until the next chapter
- Last chapter: duration until end of video
- Use these durations to determine proportional spacing

### 3. Dynamic Positioning
- Use `useEffect` to recalculate positions when:
  - Component mounts
  - Window resizes
  - Video metadata loads (duration changes)
- Fallback to timestamp-based positioning if measurement fails

### 4. Responsive Considerations
- Handle both desktop (vertical bar) and mobile (horizontal bar) layouts
- Ensure measurements work correctly in both orientations

## Files to Modify

- `src/components/sections/VideoDemo.tsx` - Main component with progress bar logic
- `src/lib/data/videoChapters.ts` - Chapter data (read-only, but affects behavior)

## Success Criteria

1. ✅ Dots are perfectly centered with tab titles on all screen sizes
2. ✅ Progress bar segments are proportional to section durations
3. ✅ Works with any video/chapter configuration without code changes
4. ✅ Handles responsive layouts correctly
5. ✅ No visual glitches when video loads or resizes

## Notes

- The solution should be robust and handle edge cases like:
  - Very short sections
  - Very long sections
  - Equal duration sections
  - Single chapter videos
  - Videos with no chapters
- Performance: Measurements should be cached and only recalculated when necessary
- Accessibility: Maintain all existing ARIA attributes and keyboard navigation