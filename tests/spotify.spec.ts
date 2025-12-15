import { test, expect } from '@playwright/test';
import { getSpotifyAccessToken, getSpotifyArtist } from '../apis/spotify';

test('Get artis', async ({ request }) => {
    const artisId = '0TnOYISbd1XYRBk9myaseg';

    let accessToken = await getSpotifyAccessToken(request);
    let artist = await getSpotifyArtist(request, accessToken, artisId);

    expect(artist.name).toEqual('Pitbull');
    expect(artist.id).toEqual(artisId);
    expect(artist.href).toContain('https://api.spotify.com');
});