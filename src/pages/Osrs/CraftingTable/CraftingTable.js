import React, { useState } from 'react';
import { CraftingRow } from './CraftingRow';

export const CraftingTable = ({ getObjectById }) => {
  return (
    <div>
      <h2>Creating items</h2>
      <table style={{ marginBottom: '4rem' }}>
        <thead>
          <th>img</th>
          <th>low price</th>
          <th>high price</th>
          <th>B.L. ▼ - S.H. ▲</th>
          <th>B.H. ▲ - S.H. ▲</th>
          <th>B.L. ▼ - SL. ▼</th>
          <th>B.H. ▲ - SL. ▼</th>
        </thead>
        <tbody>
          {/* Strawberry basket */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 5376, quantity: 1 },
              { id: 5504, quantity: 5 },
            ]}
            outputItems={[{ id: 5406, quantity: 1 }]}
          ></CraftingRow>

          {/* Serpentine helm */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[{ id: 12927, quantity: 1 }]}
            outputItems={[{ id: 12929, quantity: 1 }]}
          ></CraftingRow>

          {/* Blowpipe */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[{ id: 12922, quantity: 1 }]}
            outputItems={[{ id: 12924, quantity: 1 }]}
          ></CraftingRow>

          {/* Trident of the swamp */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 12932, quantity: 1 },
              { id: 11908, quantity: 1 },
            ]}
            outputItems={[{ id: 12900, quantity: 1 }]}
          ></CraftingRow>

          {/* Primordial boots */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 11840, quantity: 1 },
              { id: 13231, quantity: 1 },
            ]}
            outputItems={[{ id: 13239, quantity: 1 }]}
          ></CraftingRow>

          {/* Pegasian boots */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 2577, quantity: 1 },
              { id: 13229, quantity: 1 },
            ]}
            outputItems={[{ id: 13237, quantity: 1 }]}
          ></CraftingRow>

          {/* Eternal boots */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 6920, quantity: 1 },
              { id: 13227, quantity: 1 },
            ]}
            outputItems={[{ id: 13235, quantity: 1 }]}
          ></CraftingRow>

          {/* Guardian boots */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 11836, quantity: 1 },
              { id: 21730, quantity: 1 },
            ]}
            outputItems={[{ id: 21733, quantity: 1 }]}
          ></CraftingRow>

          {/* Devout boots */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 12598, quantity: 1 },
              { id: 22960, quantity: 1 },
            ]}
            outputItems={[{ id: 22954, quantity: 1 }]}
          ></CraftingRow>

          {/* Boots of brimstone */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 23037, quantity: 1 },
              { id: 22957, quantity: 1 },
            ]}
            outputItems={[{ id: 22951, quantity: 1 }]}
          ></CraftingRow>

          {/* Dragonfire shield */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 1540, quantity: 1 },
              { id: 11286, quantity: 1 },
            ]}
            outputItems={[{ id: 11284, quantity: 1 }]}
          ></CraftingRow>

          {/* Dragonfire ward */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 1540, quantity: 1 },
              { id: 22006, quantity: 1 },
            ]}
            outputItems={[{ id: 22003, quantity: 1 }]}
          ></CraftingRow>

          {/* Ancient wyvern shield */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 2890, quantity: 1 },
              { id: 21637, quantity: 1 },
            ]}
            outputItems={[{ id: 21634, quantity: 1 }]}
          ></CraftingRow>

          {/* Dragon kiteshield */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 1187, quantity: 1 },
              { id: 22097, quantity: 1 },
              { id: 22100, quantity: 1 },
            ]}
            outputItems={[{ id: 21895, quantity: 1 }]}
          ></CraftingRow>

          {/* Blessed spirit shield */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 12829, quantity: 1 },
              { id: 12833, quantity: 1 },
            ]}
            outputItems={[{ id: 12831, quantity: 1 }]}
          ></CraftingRow>

          {/* Elysian spirit shield */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 12831, quantity: 1 },
              { id: 12819, quantity: 1 },
            ]}
            outputItems={[{ id: 12817, quantity: 1 }]}
          ></CraftingRow>

          {/* Arcane spirit shield */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 12831, quantity: 1 },
              { id: 12827, quantity: 1 },
            ]}
            outputItems={[{ id: 12825, quantity: 1 }]}
          ></CraftingRow>

          {/* Spectral spirit shield */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 12831, quantity: 1 },
              { id: 12823, quantity: 1 },
            ]}
            outputItems={[{ id: 12821, quantity: 1 }]}
          ></CraftingRow>

          {/* Staff of light */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 11791, quantity: 1 },
              { id: 13256, quantity: 1 },
            ]}
            outputItems={[{ id: 22296, quantity: 1 }]}
          ></CraftingRow>

          {/* Toxic staff of the dead */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 11791, quantity: 1 },
              { id: 12932, quantity: 1 },
            ]}
            outputItems={[{ id: 12902, quantity: 1 }]}
          ></CraftingRow>

          {/* Kodai wand */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 6914, quantity: 1 },
              { id: 21043, quantity: 1 },
            ]}
            outputItems={[{ id: 21006, quantity: 1 }]}
          ></CraftingRow>

          {/* Accursed sceptre (u) */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 22552, quantity: 1 },
              { id: 27673, quantity: 1 },
            ]}
            outputItems={[{ id: 27662, quantity: 1 }]}
          ></CraftingRow>

          {/* Burning claws */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[{ id: 29574, quantity: 2 }]}
            outputItems={[{ id: 29577, quantity: 1 }]}
          ></CraftingRow>

          {/* Hueycoatl hide coif */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[{ id: 30085, quantity: 2 }]}
            outputItems={[{ id: 30073, quantity: 1 }]}
          ></CraftingRow>

          {/* Hueycoatl hide body */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[{ id: 30085, quantity: 3 }]}
            outputItems={[{ id: 30076, quantity: 1 }]}
          ></CraftingRow>

          {/* Hueycoatl hide chaps */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[{ id: 30085, quantity: 2 }]}
            outputItems={[{ id: 30079, quantity: 1 }]}
          ></CraftingRow>

          {/* Hueycoatl hide vambraces */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[{ id: 30085, quantity: 1 }]}
            outputItems={[{ id: 30082, quantity: 1 }]}
          ></CraftingRow>

          {/* Bloodbark helm */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 3385, quantity: 1 },
              { id: 565, quantity: 250 },
            ]}
            outputItems={[{ id: 25413, quantity: 1 }]}
          ></CraftingRow>

          {/* Bloodbark body */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 3387, quantity: 1 },
              { id: 565, quantity: 500 },
            ]}
            outputItems={[{ id: 25404, quantity: 1 }]}
          ></CraftingRow>

          {/* Bloodbark legs */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 3389, quantity: 1 },
              { id: 565, quantity: 500 },
            ]}
            outputItems={[{ id: 25416, quantity: 1 }]}
          ></CraftingRow>

          {/* Bloodbark gauntlets */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 3391, quantity: 1 },
              { id: 565, quantity: 100 },
            ]}
            outputItems={[{ id: 25407, quantity: 1 }]}
          ></CraftingRow>

          {/* Bloodbark boots */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 3393, quantity: 1 },
              { id: 565, quantity: 100 },
            ]}
            outputItems={[{ id: 25410, quantity: 1 }]}
          ></CraftingRow>

          {/* Torva full helm (Bandos chestplate) */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 26376, quantity: 1 },
              { id: 11832, quantity: 0.33 },
            ]}
            outputItems={[{ id: 26382, quantity: 1 }]}
          ></CraftingRow>

          {/* Torva platebody (Bandos chestplate) */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 26378, quantity: 1 },
              { id: 11832, quantity: 0.66 },
            ]}
            outputItems={[{ id: 26384, quantity: 1 }]}
          ></CraftingRow>

          {/* Torva platelegs (Bandos chestplate) */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 26380, quantity: 1 },
              { id: 11832, quantity: 0.66 },
            ]}
            outputItems={[{ id: 26386, quantity: 1 }]}
          ></CraftingRow>

          {/* Torva full helm (Bandos tassets) */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 26376, quantity: 1 },
              { id: 11834, quantity: 0.5 },
            ]}
            outputItems={[{ id: 26382, quantity: 1 }]}
          ></CraftingRow>

          {/* Torva platebody (Bandos tassets) */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 26378, quantity: 1 },
              { id: 11834, quantity: 1 },
            ]}
            outputItems={[{ id: 26384, quantity: 1 }]}
          ></CraftingRow>

          {/* Torva platelegs (Bandos tassets) */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 26380, quantity: 1 },
              { id: 11834, quantity: 1 },
            ]}
            outputItems={[{ id: 26386, quantity: 1 }]}
          ></CraftingRow>

          {/* Zaryte crossbow */}
          <CraftingRow
            getObjectById={getObjectById}
            inputItems={[
              { id: 11785, quantity: 1 },
              { id: 26372, quantity: 1 },
              { id: 26231, quantity: 250 },
            ]}
            outputItems={[{ id: 26374, quantity: 1 }]}
          ></CraftingRow>
        </tbody>
      </table>
    </div>
  );
};
