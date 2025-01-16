const saveButton = document.getElementById('saveButton');
const diaryInput = document.getElementById('diaryInput');
const diaryList = document.getElementById('diaryList');

// 保存ボタンをクリックしたときの動作
saveButton.addEventListener('click', () => {
  const diaryText = diaryInput.value.trim();
  if (diaryText) {
    saveDiary(diaryText);
    renderDiaries();
    diaryInput.value = ''; // 入力フィールドをクリア
  } else {
    alert('日記を入力してください！');
  }
});

// ローカルストレージに日記を保存
function saveDiary(text) {
  const diaries = JSON.parse(localStorage.getItem('diaries')) || [];
  diaries.push(text);
  localStorage.setItem('diaries', JSON.stringify(diaries));
}

// 保存された日記を画面に表示
function renderDiaries() {
  const diaries = JSON.parse(localStorage.getItem('diaries')) || [];
  diaryList.innerHTML = ''; // リストをクリア
  diaries.forEach((diary, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = diary;

    // 削除ボタン
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.addEventListener('click', () => {
      deleteDiary(index);
    });

    listItem.appendChild(deleteButton);
    diaryList.appendChild(listItem);
  });
}

// 日記を削除
function deleteDiary(index) {
  const diaries = JSON.parse(localStorage.getItem('diaries')) || [];
  diaries.splice(index, 1);
  localStorage.setItem('diaries', JSON.stringify(diaries));
  renderDiaries();
}

// 初期表示
renderDiaries();
