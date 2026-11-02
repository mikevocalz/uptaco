/** These are temporary public image references only. Replace with approved,
 * original Uptaco assets in an owned CDN before a production launch.
 */
export const UPTACO_MEDIA = {
  heroBec:'https://static.wixstatic.com/media/37385d_60b2c1e688a14a7692afc06b983179d2~mv2.png',
  wordmarkBlack:'https://static.wixstatic.com/media/37385d_25f449b176dc41c0a60769401cd103fb~mv2.png',
  midtown:'https://static.wixstatic.com/media/37385d_ccabe5958daa4d0ca016f94047d6bb32~mv2.jpeg',
  harlem:'https://static.wixstatic.com/media/37385d_b54ad35c2400423d91c8a54b76305198~mv2.jpeg',
  cafeFood:'https://static.wixstatic.com/media/37385d_672d66d78ecd42c2b9fef45e7931b196~mv2.jpg'
} as const;

export const UPTACO_LOCATIONS = {
  harlem:{label:'Harlem',address:'300 W 135th St',crossStreet:'135th & St. Nicholas Ave',
    fullAddress:'300 West 135th Street, New York, NY 10027'},
  midtown:{label:'Midtown',address:'550 Madison Ave',crossStreet:'Plaza at 55th Street',
    fullAddress:'550 Madison Avenue, New York, NY'}
} as const;
