import {LabelName} from "../../../store/labels/types";
import {DetectedObject} from "@tensorflow-models/coco-ssd";
import {AIActions} from "../AIActions";

describe('AIActions extractNewSuggestedLabelNames method', () => {
    const mockLabelNames: LabelName[] = [
        {
            id: "id_1",
            name: "label_1"
        },
        {
            id: "id_2",
            name: "label_2"
        },
        {
            id: "id_3",
            name: "label_3"
        }
    ];

    it('should return list with correct values', () => {
        // GIVEN
        const labelNames: LabelName[] = mockLabelNames;
        const predictions: DetectedObject[] = [
            {
                bbox: [],
                class: "label_3",
                score: 0
            },
            {
                bbox: [],
                class: "label_4",
                score: 0
            },
            {
                bbox: [],
                class: "label_5",
                score: 0
            }
        ];

        // WHEN
        const suggestedLabels: string[] = AIActions.extractNewSuggestedLabelNames(labelNames, predictions);

        // THEN
        expect(suggestedLabels.toString()).toBe(["label_4", "label_5"].toString());
    });

    it('should return empty list', () => {
        // GIVEN
        const labelNames: LabelName[] = mockLabelNames;
        const predictions: DetectedObject[] = [
            {
                bbox: [],
                class: "label_3",
                score: 0
            },
            {
                bbox: [],
                class: "label_1",
                score: 0
            }
        ];

        // WHEN
        const suggestedLabels: string[] = AIActions.extractNewSuggestedLabelNames(labelNames, predictions);

        // THEN
        expect(suggestedLabels.toString()).toBe([].toString());
    });
});

describe('AIActions excludeRejectedLabelNames method', () => {
    it('should return list with correct values', () => {
        // GIVEN
        const suggestedLabels: string[] = [
            "label_1",
            "label_2",
            "label_3",
            "label_4",
        ];

        const rejectedLabels: string[] = [
            "label_3",
            "label_4",
            "label_5",
        ];

        // WHEN
        const excludedLabels: string[] = AIActions.excludeRejectedLabelNames(suggestedLabels, rejectedLabels);

        // THEN
        const expectedLabels: string[] = [
            "label_1",
            "label_2",
        ];
        expect(excludedLabels.toString()).toBe(expectedLabels.toString());
    });
});