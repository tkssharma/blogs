<script>
	import { siteSettings } from '$lib/config/site_config';
	import { isAuthenticated } from '$lib/stores/auth';
	import Icon, {
		LightningBolt,
		Login,
		Logout,
		X,
		Menu,
		LightBulb,
		CurrencyDollar,
		Pencil
	} from 'svelte-hero-icons';

	let routes = [
		{
			title: 'Features',
			url: '/features',
			icon: LightBulb
		},
		{
			title: 'Pricing',
			url: '/pricing',
			icon: CurrencyDollar
		},
		{
			title: 'Blog',
			url: '/blog',
			icon: Pencil
		}
	];

	let mobileMenuOpen = false;
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	$: menuClass = !mobileMenuOpen
		? 'opacity-0 scale-95 pointer-events-none'
		: 'opacity-100 scale-100';
</script>

<header class="flex w-full justify-between py-4 px-6">
	<a class="flex items-center space-x-4" href="/">
		<img class="h-10 w-auto" src="/logo.svg" alt={siteSettings.title} />
		<div class="hidden md:block text-lg font-medium">{siteSettings.title}</div>
	</a>
	<!-- Web -->
	<nav class="flex-1 justify-center items-center space-x-6 font-medium hidden md:flex">
		{#each routes as route}
			<a href={route.url} sveltekit:prefetch class="">{route.title}</a>
		{/each}
	</nav>
	<nav class="hidden md:flex space-x-3 items-center">
		<a href="/login" class="btn bg-transparent text-gray-800">Login</a>
		<a href="/get-started" class="btn">Get Started</a>
	</nav>

	<!-- Mobile -->
	<div class="md:hidden">
		<button
			on:click={toggleMobileMenu}
			class="relative border-2 rounded border-primary-700 text-primary-700 md:hidden"
		>
			<span class="sr-only">Toggle Menu</span>
			{#if mobileMenuOpen}
				<Icon src={X} class="h-6 w-6" />
			{:else}
				<Icon src={Menu} class="h-6 w-6" />
			{/if}
		</button>
		<nav
			class="flex flex-col fixed w-screen h-screen z-50 inset-0 p-4 duration-200 ease-out transition transform {menuClass} bg-gradient-to-b from-primary-500 to-gray-900 "
		>
			<div class="flex justify-between w-full">
				<a
					on:click={toggleMobileMenu}
					href="/"
					sveltekit:prefetch
					class="p-2 text-white text-center flex items-center space-x-4 text-xl"
				>
					<img class="h-10 w-auto" src="/logo.svg" alt={siteSettings.title} />
					<span class=""> {siteSettings.title} </span>
				</a>
				<button
					on:click={toggleMobileMenu}
					class="text-gray-200 hover:bg-black hover:text-white group rounded-md flex flex-col justify-center text-lg font-bold"
				>
					<Icon src={X} class="h-10 w-auto" />
				</button>
			</div>
			<div class="flex text-center justify-center flex-wrap content-center h-3/4">
				<!-- App Routes -->
				{#each routes as route}
					<a
						on:click={toggleMobileMenu}
						href={route.url}
						sveltekit:prefetch
						class="p-2 text-white text-center w-1/3"
					>
						<Icon src={route.icon} class="h-12 w-12 mx-auto" />
						<span class="text-center">
							{route.title}
						</span>
					</a>
				{/each}
				<!-- User Routes -->
				{#if $isAuthenticated}
					<a
						on:click={toggleMobileMenu}
						href="/logout"
						sveltekit:prefetch
						class="p-2 text-white text-center w-1/3"
					>
						<Icon src={Logout} class="h-12 w-12 mx-auto" />
						<span class="text-center"> Logout </span>
					</a>
				{:else}
					<a
						on:click={toggleMobileMenu}
						href="/login"
						sveltekit:prefetch
						class="mt-16 p-2 text-white text-center w-1/3"
					>
						<Icon src={Login} class="h-12 w-12 mx-auto" />
						<span class="text-center"> Login </span>
					</a>
					<a
						on:click={toggleMobileMenu}
						href="/getting-started"
						sveltekit:prefetch
						class="mt-16 p-2 text-secondary-200 text-center w-1/3"
					>
						<Icon src={LightningBolt} class="h-12 w-12 mx-auto" />
						<span class="text-center"> Get Started </span>
					</a>
				{/if}
			</div>
		</nav>
	</div>
</header>
