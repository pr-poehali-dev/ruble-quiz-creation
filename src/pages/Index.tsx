import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const CATEGORIES = ['История', 'География', 'Наука', 'Спорт', 'Культура', 'Технологии'];

const QUESTIONS = [
  {
    id: 1,
    category: 'История',
    question: 'В каком году началась Вторая мировая война?',
    options: ['1939', '1941', '1945', '1938'],
    correct: 0,
    reward: 5
  },
  {
    id: 2,
    category: 'История',
    question: 'Кто был первым президентом США?',
    options: ['Томас Джефферсон', 'Джордж Вашингтон', 'Авраам Линкольн', 'Бенджамин Франклин'],
    correct: 1,
    reward: 4
  },
  {
    id: 3,
    category: 'История',
    question: 'В каком году был основан СССР?',
    options: ['1917', '1922', '1918', '1924'],
    correct: 1,
    reward: 6
  },
  {
    id: 4,
    category: 'История',
    question: 'Кто открыл Америку в 1492 году?',
    options: ['Магеллан', 'Васко да Гама', 'Христофор Колумб', 'Америго Веспуччи'],
    correct: 2,
    reward: 3
  },
  {
    id: 5,
    category: 'География',
    question: 'Какая река является самой длинной в мире?',
    options: ['Амазонка', 'Нил', 'Янцзы', 'Миссисипи'],
    correct: 1,
    reward: 7
  },
  {
    id: 6,
    category: 'География',
    question: 'Столица Австралии?',
    options: ['Сидней', 'Мельбурн', 'Канберра', 'Брисбен'],
    correct: 2,
    reward: 8
  },
  {
    id: 7,
    category: 'География',
    question: 'Какой океан самый большой по площади?',
    options: ['Атлантический', 'Тихий', 'Индийский', 'Северный Ледовитый'],
    correct: 1,
    reward: 4
  },
  {
    id: 8,
    category: 'География',
    question: 'На каком континенте расположена пустыня Сахара?',
    options: ['Азия', 'Австралия', 'Африка', 'Южная Америка'],
    correct: 2,
    reward: 2
  },
  {
    id: 9,
    category: 'Наука',
    question: 'Какая планета Солнечной системы самая большая?',
    options: ['Сатурн', 'Нептун', 'Юпитер', 'Уран'],
    correct: 2,
    reward: 8
  },
  {
    id: 10,
    category: 'Наука',
    question: 'Какой элемент имеет химический символ O?',
    options: ['Осмий', 'Кислород', 'Золото', 'Водород'],
    correct: 1,
    reward: 2
  },
  {
    id: 11,
    category: 'Наука',
    question: 'Сколько костей в теле взрослого человека?',
    options: ['198', '206', '214', '187'],
    correct: 1,
    reward: 7
  },
  {
    id: 12,
    category: 'Наука',
    question: 'Кто разработал теорию относительности?',
    options: ['Исаак Ньютон', 'Альберт Эйнштейн', 'Нильс Бор', 'Стивен Хокинг'],
    correct: 1,
    reward: 5
  },
  {
    id: 13,
    category: 'Спорт',
    question: 'Сколько игроков в футбольной команде на поле?',
    options: ['9', '10', '11', '12'],
    correct: 2,
    reward: 3
  },
  {
    id: 14,
    category: 'Спорт',
    question: 'В каком виде спорта используется шайба?',
    options: ['Футбол', 'Хоккей', 'Баскетбол', 'Регби'],
    correct: 1,
    reward: 2
  },
  {
    id: 15,
    category: 'Спорт',
    question: 'Сколько колец на олимпийском флаге?',
    options: ['4', '5', '6', '7'],
    correct: 1,
    reward: 3
  },
  {
    id: 16,
    category: 'Спорт',
    question: 'Какая страна выиграла чемпионат мира по футболу 2018?',
    options: ['Германия', 'Бразилия', 'Франция', 'Аргентина'],
    correct: 2,
    reward: 6
  },
  {
    id: 17,
    category: 'Культура',
    question: 'Кто написал "Войну и мир"?',
    options: ['Достоевский', 'Толстой', 'Чехов', 'Пушкин'],
    correct: 1,
    reward: 6
  },
  {
    id: 18,
    category: 'Культура',
    question: 'Кто написал "Евгений Онегин"?',
    options: ['Лермонтов', 'Гоголь', 'Пушкин', 'Тургенев'],
    correct: 2,
    reward: 4
  },
  {
    id: 19,
    category: 'Культура',
    question: 'Кто написал "Мастер и Маргарита"?',
    options: ['Булгаков', 'Шолохов', 'Пастернак', 'Набоков'],
    correct: 0,
    reward: 5
  },
  {
    id: 20,
    category: 'Культура',
    question: 'Кто нарисовал "Мону Лизу"?',
    options: ['Микеланджело', 'Рафаэль', 'Леонардо да Винчи', 'Тициан'],
    correct: 2,
    reward: 7
  },
  {
    id: 21,
    category: 'Технологии',
    question: 'В каком году был основан Google?',
    options: ['1996', '1998', '2000', '2001'],
    correct: 1,
    reward: 9
  },
  {
    id: 22,
    category: 'Технологии',
    question: 'Кто основал компанию Apple?',
    options: ['Билл Гейтс', 'Стив Джобс', 'Илон Маск', 'Марк Цукерберг'],
    correct: 1,
    reward: 4
  },
  {
    id: 23,
    category: 'Технологии',
    question: 'Что означает HTTP?',
    options: ['HyperText Transfer Protocol', 'High Transfer Text Protocol', 'HyperText Test Protocol', 'Home Tool Transfer Protocol'],
    correct: 0,
    reward: 8
  },
  {
    id: 24,
    category: 'Технологии',
    question: 'В каком году был создан первый iPhone?',
    options: ['2005', '2006', '2007', '2008'],
    correct: 2,
    reward: 6
  },
];

const LEADERBOARD = [
  { name: 'Александр К.', balance: 12450, answers: 234 },
  { name: 'Мария С.', balance: 11890, answers: 198 },
  { name: 'Дмитрий В.', balance: 10320, answers: 176 },
  { name: 'Анна П.', balance: 9780, answers: 165 },
  { name: 'Сергей М.', balance: 8920, answers: 148 },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('quiz');
  const [balance, setBalance] = useState(850);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [totalAnswered, setTotalAnswered] = useState(42);
  const [correctAnswers, setCorrectAnswers] = useState(35);
  const [streak, setStreak] = useState(5);
  const [history, setHistory] = useState<Array<{question: string, correct: boolean, reward: number}>>([
    { question: 'Столица Франции?', correct: true, reward: 5 },
    { question: 'Автор "Мастер и Маргарита"?', correct: true, reward: 7 },
    { question: 'Год основания Москвы?', correct: false, reward: 0 },
  ]);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    const question = QUESTIONS[currentQuestion];
    const isCorrect = index === question.correct;
    
    if (isCorrect) {
      setBalance(prev => prev + question.reward);
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => prev + 1);
      setHistory(prev => [{question: question.question, correct: true, reward: question.reward}, ...prev.slice(0, 9)]);
    } else {
      setStreak(0);
      setHistory(prev => [{question: question.question, correct: false, reward: 0}, ...prev.slice(0, 9)]);
    }
    setTotalAnswered(prev => prev + 1);
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % QUESTIONS.length);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const question = QUESTIONS[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">КВИЗ</h1>
              <p className="text-muted-foreground">Профессиональная викторина с реальными выплатами</p>
            </div>
            <div className="flex items-center gap-4">
              <Card className="bg-gradient-to-r from-primary to-accent border-0">
                <CardContent className="p-4 flex items-center gap-3">
                  <Icon name="Coins" size={32} className="text-primary-foreground" />
                  <div>
                    <p className="text-xs text-primary-foreground/80 font-medium">Баланс</p>
                    <p className="text-2xl font-bold text-primary-foreground">{balance} ₽</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="Target" size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Точность</p>
                  <p className="text-xl font-bold">{Math.round((correctAnswers / totalAnswered) * 100)}%</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Icon name="Trophy" size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Правильных</p>
                  <p className="text-xl font-bold">{correctAnswers} / {totalAnswered}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <Icon name="Flame" size={24} className="text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Серия побед</p>
                  <p className="text-xl font-bold">{streak}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="quiz" className="text-base font-medium">
              <Icon name="HelpCircle" size={18} className="mr-2" />
              Викторина
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-base font-medium">
              <Icon name="Trophy" size={18} className="mr-2" />
              Рейтинг
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-base font-medium">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="rules" className="text-base font-medium">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Правила
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quiz" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {question.category}
                  </Badge>
                  <Badge className="text-sm px-3 py-1 bg-gradient-to-r from-primary to-accent border-0 text-white">
                    +{question.reward} ₽
                  </Badge>
                </div>
                <CardTitle className="text-2xl leading-tight">{question.question}</CardTitle>
                <Progress value={((currentQuestion + 1) / QUESTIONS.length) * 100} className="mt-4" />
                <CardDescription className="mt-2">
                  Вопрос {currentQuestion + 1} из {QUESTIONS.length}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === question.correct;
                  
                  let buttonClass = '';
                  if (showResult) {
                    if (isCorrect) {
                      buttonClass = 'bg-accent text-accent-foreground border-accent';
                    } else if (isSelected && !isCorrect) {
                      buttonClass = 'bg-destructive text-destructive-foreground border-destructive';
                    }
                  }

                  return (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      variant={isSelected && !showResult ? 'default' : 'outline'}
                      className={`w-full justify-start text-left h-auto py-4 text-base ${buttonClass} transition-all`}
                    >
                      <span className="font-bold mr-3 text-lg">{String.fromCharCode(65 + index)}.</span>
                      {option}
                      {showResult && isCorrect && (
                        <Icon name="CheckCircle2" size={20} className="ml-auto" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <Icon name="XCircle" size={20} className="ml-auto" />
                      )}
                    </Button>
                  );
                })}

                {showResult && (
                  <div className="pt-4">
                    <Button onClick={nextQuestion} className="w-full" size="lg">
                      Следующий вопрос
                      <Icon name="ArrowRight" size={18} className="ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Filter" size={20} />
                  Категории
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <Badge key={cat} variant="outline" className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Trophy" size={24} className="text-accent" />
                  Топ игроков
                </CardTitle>
                <CardDescription>Лучшие участники викторины</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {LEADERBOARD.map((player, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                          index === 0 ? 'bg-yellow-400 text-yellow-900' :
                          index === 1 ? 'bg-gray-300 text-gray-700' :
                          index === 2 ? 'bg-orange-400 text-orange-900' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{player.name}</p>
                          <p className="text-sm text-muted-foreground">{player.answers} ответов</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl text-accent">{player.balance} ₽</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="User" size={24} />
                    Профиль
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white">
                      ИВ
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Иван В.</h3>
                      <p className="text-muted-foreground">Участник с 12.10.2025</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Баланс</span>
                      <span className="font-bold text-xl">{balance} ₽</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Всего ответов</span>
                      <span className="font-bold">{totalAnswered}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Правильных</span>
                      <span className="font-bold text-accent">{correctAnswers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Процент точности</span>
                      <span className="font-bold">{Math.round((correctAnswers / totalAnswered) * 100)}%</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Icon name="Wallet" size={18} className="mr-2" />
                    Вывести средства
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="History" size={24} />
                    История ответов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {history.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <div className={`mt-1 ${item.correct ? 'text-accent' : 'text-destructive'}`}>
                          <Icon name={item.correct ? 'CheckCircle2' : 'XCircle'} size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.question}</p>
                          {item.correct && (
                            <p className="text-xs text-accent font-semibold mt-1">+{item.reward} ₽</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rules">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BookOpen" size={24} />
                    Правила игры
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-semibold mb-1">Отвечайте на вопросы</h4>
                        <p className="text-sm text-muted-foreground">Выбирайте правильный ответ из четырех вариантов</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-semibold mb-1">Зарабатывайте рубли</h4>
                        <p className="text-sm text-muted-foreground">За каждый правильный ответ получайте от 1 до 10 рублей</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-semibold mb-1">Без лимитов</h4>
                        <p className="text-sm text-muted-foreground">Играйте сколько хотите, количество вопросов не ограничено</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">4</div>
                      <div>
                        <h4 className="font-semibold mb-1">Выводите средства</h4>
                        <p className="text-sm text-muted-foreground">Накопленные рубли можно вывести в любое время</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="HelpCircle" size={24} />
                    FAQ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Как начисляются рубли?</h4>
                    <p className="text-sm text-muted-foreground">Сумма вознаграждения зависит от сложности вопроса. Более сложные вопросы приносят больше рублей (от 1 до 10 ₽).</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Есть ли ограничения?</h4>
                    <p className="text-sm text-muted-foreground">Нет! Отвечайте на вопросы без ограничений по времени и количеству попыток.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Как вывести деньги?</h4>
                    <p className="text-sm text-muted-foreground">Минимальная сумма для вывода — 500 рублей. Переводы обрабатываются в течение 1-3 рабочих дней.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Что такое серия побед?</h4>
                    <p className="text-sm text-muted-foreground">Количество правильных ответов подряд. Чем длиннее серия, тем выше ваш рейтинг!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;