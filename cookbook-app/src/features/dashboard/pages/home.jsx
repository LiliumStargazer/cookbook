import NavBar from '@/shared/components/navbar.jsx';
import StatisticCard from '@/features/dashboard/components/statistic-card.jsx';
import { useUsersCount } from '@/features/dashboard/hooks/use-users-count.js';
import { useReviewsCount } from '@/features/dashboard/hooks/use-reviews-count.js';
import { useRecipesCount } from '@/features/dashboard/hooks/use-recipes-count.js';
import { useRandomMeal } from '@/features/dashboard/hooks/use-random-meal.js';
import RecipeCard from '@/shared/components/recipe-card.jsx';
import { useTopRatedMeals } from '@/features/dashboard/hooks/use-top-rated-meal.js';

function Home() {
  const { loadingUsers, usersCount, errorUsersCount } = useUsersCount();
  const { loadingReviews, reviewsCount, errorReviews } = useReviewsCount();
  const { loadingRecipes, recipesCount, errorRecipes } = useRecipesCount();
  const { loadingRandomMeal, randomMeal } = useRandomMeal();
  const { loadingTopRated, topRatedMeal } = useTopRatedMeals();
  const statsData = [
    { label: 'Active users', value: usersCount, loading: loadingUsers, error: errorUsersCount },
    {
      label: 'Total reviews',
      value: reviewsCount,
      loading: loadingReviews,
      error: errorReviews,
    },
    {
      label: 'Total recipes',
      value: recipesCount,
      loading: loadingRecipes,
      error: errorRecipes,
    },
  ];

  console.log(topRatedMeal);

  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <NavBar />
      {/* Card Section */}
      <section className='py-10 flex justify-center gap-6 text-center'>
        {statsData.map(stat => (
          <StatisticCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            loading={stat.loading}
            error={stat.error}
          />
        ))}
      </section>
      {/* Random meal */}
      <section className='max-w-xl mx-auto mb-10'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Discover a random meal</h2>
        <RecipeCard
          meal={randomMeal}
          loading={loadingRandomMeal}
          isInCookbook={false} // Assuming this is not in the cookbook
        />
      </section>
      {/* Top rated recipe */}
      <section className='max-w-xl mx-auto mb-10'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Top rated recipe </h2>
        <RecipeCard
          meal={topRatedMeal}
          loading={loadingTopRated}
          isInCookbook={false} // Assuming this is not in the cookbook
        />
      </section>
      {/* Latest reviews - to be implemented */}
      <section className='max-w-2xl mx-auto mb-10'>
        {/* Latest reviews component will be placed here */}
      </section>
      {/* Most popular recipes - to be implemented */}
      <section className='max-w-4xl mx-auto mb-10'>
        {/* Most popular recipes component will be placed here */}
      </section>
      {/* Motivation/gamification - to be implemented */}
      <section className='max-w-xl mx-auto mb-10'>
        {/* User badge/progress component will be placed here */}
      </section>
      {/* Footer - to be implemented */}
      <footer className='w-full py-6 mt-10 border-t text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900'>
        <span>Cookbook &copy; 2025 - All rights reserved</span>
      </footer>
    </div>
  );
}

export default Home;
