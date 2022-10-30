/* Tools script */

const q = document.querySelector.bind(document);
const i = document.getElementById.bind(document);
const qa = document.querySelectorAll.bind(document);
const b = document.body;

// Display buttons variables

const rows = 4;

const keys = {
    row1: ['ص', 'ش', 'س', 'ز', 'ر', 'ذ', 'د', 'خ', 'ح', 'ج', 'ث', 'ت', 'ب', 'ا'],
    row2: ['ي', 'و', 'ه', 'ن', 'م', 'ل', 'ك', 'ق', 'ف', 'غ', 'ع', 'ظ', 'ط','ض'],
    row4: ['٠', '٩', '٨', '٧', '٦', '٥', '٤', '٣', '٢', '١','؟', '؛', '،','.'],
    row3: ['ء', 'ؤ','ى', 'ئ','Space', 'ة', 'آ', 'إ', 'أ']
}

// Recent search

const recentCount = 5;