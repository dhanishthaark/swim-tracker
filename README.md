# swim-tracker

Product specification v0.1

**Problem identification**
Swimmers need a simple way to record and track their swimming performances over time, particularly personal bests across different strokes and distances.

**Target users**
Competitive/regular swimmers who want a simple way to track their times and progress.

**MVP**

Dashboard
- swimmer name
- recent results
- current PBs
- ( a PB is the user's fastest recorded time for a specific stroke + distance )

**Add Result**
- date
- stroke
- distance
- time
- optional competition/training label
  
**Progress**
- times over time
- PB highlighted
- filter by stroke/distance
  
**Calendar**
- upcoming competitions/training sessions

## MVP user flow

1. User opens the dashboard.
2. User can see their recent results and current PBs.
3. User selects "Add Result".
4. User enters:
   - date
   - stroke
   - distance
   - time
   - competition/training
     
5. Result is saved.
6. Dashboard updates automatically.
7. Progress page shows the swimmer's times over time.
8. PBs are highlighted.
9. Calendar shows upcoming competitions and training sessions.

## Example data

- 50m Freestyle — 31.42s
- 100m Freestyle — 1:08.73
- 100m Backstroke — 1:15.21
- 200m IM — 2:48.60

## Non-goals for v0.1

- No social feed
- No messaging
- No payments
- No complicated coaching features
- No wearable integration ( not for now )
- No AI features !!!

